import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-id';
import { CustomStep, OptionsStep, TextStep } from './steps';
import schema from './schemas/schema';
import * as storage from './storage';
import ChatBotContainer from './ChatBotContainer';
import Content from './Content';
import Header from './Header';
import HeaderTitle from './HeaderTitle';
import HeaderIcon from './HeaderIcon';
import FloatButton from './FloatButton';
import Footer from './Footer';
import Input from './Input';
import SubmitButton from './SubmitButton';
import {
  ChatIcon,
  CloseIcon,
  SubmitIcon,
} from './icons';

class ChatBot extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      disabled: true,
      opened: props.opened || !props.floating,
      inputValue: '',
      inputInvalid: false,
      defaultUserSettings: {},
    };

    this.renderStep = this.renderStep.bind(this);
    this.getTriggeredStep = this.getTriggeredStep.bind(this);
    this.generateRenderedStepsById = this.generateRenderedStepsById.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  componentWillMount() {
    const {
      botDelay,
      botAvatar,
      cache,
      cacheName,
      customDelay,
      userAvatar,
      userDelay,
    } = this.props;
    const steps = {};

    const defaultBotSettings = { delay: botDelay, avatar: botAvatar };
    const defaultUserSettings = { delay: userDelay, avatar: userAvatar };
    const defaultCustomSettings = { delay: customDelay };

    for (let i = 0, len = this.props.steps.length; i < len; i += 1) {
      const step = this.props.steps[i];
      let settings = {};

      if (step.user) {
        settings = defaultUserSettings;
      } else if (step.message || step.asMessage) {
        settings = defaultBotSettings;
      } else if (step.component) {
        settings = defaultCustomSettings;
      }

      steps[step.id] = Object.assign(
        {},
        settings,
        schema.parse(step),
      );
    }

    schema.checkInvalidIds(steps);

    const firstStep = this.props.steps[0];

    if (firstStep.message) {
      const message = firstStep.message;
      firstStep.message = typeof message === 'function' ? message() : message;
      steps[firstStep.id].message = firstStep.message;
    }

    const {
      currentStep,
      previousStep,
      previousSteps,
      renderedSteps,
    } = storage.getData({
      cacheName,
      cache,
      firstStep,
      steps,
    }, () => {
      // focus input if last step cached is a user step
      this.setState({ disabled: false }, () => {
        this.input.focus();
      });
    });

    this.setState({
      currentStep,
      defaultUserSettings,
      previousStep,
      previousSteps,
      renderedSteps,
      steps,
    });
  }

  componentDidMount() {
    this.content.addEventListener('DOMNodeInserted', this.onNodeInserted);
  }

  componentWillUpdate(nextProps, nextState) {
    const { opened } = nextProps;

    if (opened !== undefined && opened !== nextState.opened) {
      this.setState({ opened });
    }
  }

  componentWillUnmount() {
    this.content.removeEventListener('DOMNodeInserted', this.onNodeInserted);
  }

  onNodeInserted(event) {
    event.currentTarget.scrollTop = event.currentTarget.scrollHeight;
  }

  onValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  getTriggeredStep(trigger, value) {
    const steps = this.generateRenderedStepsById();
    return (typeof trigger === 'function') ? trigger({ value, steps }) : trigger;
  }

  getStepMessage(message) {
    const { previousSteps } = this.state;
    const lastStepIndex = previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return (typeof message === 'function') ? message({ previousValue, steps }) : message;
  }

  generateRenderedStepsById() {
    const { previousSteps } = this.state;
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value } = previousSteps[i];
      steps[id] = { id, message, value };
    }

    return steps;
  }

  triggerNextStep(data) {
    const {
      defaultUserSettings,
      previousSteps,
      renderedSteps,
      steps,
    } = this.state;
    let { currentStep, previousStep } = this.state;
    const isEnd = currentStep.end;

    if (data && data.value) {
      currentStep.value = data.value;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, data.value);
    }

    if (isEnd) {
      this.handleEnd();
    } else if (currentStep.options && data) {
      const option = currentStep.options.filter(o => o.value === data.value)[0];
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      // replace choose option for user message
      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
        },
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    } else if (currentStep.trigger) {
      if (currentStep.replace) {
        renderedSteps.pop();
      }

      const trigger = this.getTriggeredStep(currentStep.trigger, currentStep.value);
      let nextStep = Object.assign({}, steps[trigger]);

      if (nextStep.message) {
        nextStep.message = this.getStepMessage(nextStep.message);
      } else if (nextStep.update) {
        const updateStep = nextStep;
        nextStep = Object.assign({}, steps[updateStep.update]);

        if (nextStep.options) {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        } else {
          nextStep.trigger = updateStep.trigger;
        }
      }

      nextStep.key = Random(24);

      previousStep = currentStep;
      currentStep = nextStep;

      this.setState({ renderedSteps, currentStep, previousStep }, () => {
        if (nextStep.user) {
          this.setState({ disabled: false }, () => {
            this.input.focus();
          });
        } else {
          renderedSteps.push(nextStep);
          previousSteps.push(nextStep);

          this.setState({ renderedSteps, previousSteps });
        }
      });
    }

    const { cache, cacheName } = this.props;
    if (cache) {
      setTimeout(() => {
        storage.setData(cacheName, {
          currentStep,
          previousStep,
          previousSteps,
          renderedSteps,
        });
      }, 300);
    }
  }

  handleEnd() {
    if (this.props.handleEnd) {
      const { previousSteps } = this.state;

      const renderedSteps = previousSteps.map((step) => {
        const { id, message, value } = step;
        return { id, message, value };
      });

      const steps = [];

      for (let i = 0, len = previousSteps.length; i < len; i += 1) {
        const { id, message, value } = previousSteps[i];
        steps[id] = { id, message, value };
      }

      const values = previousSteps.filter(step => step.value).map(step => step.value);

      this.props.handleEnd({ renderedSteps, steps, values });
    }
  }

  isLastPosition(step) {
    const { renderedSteps } = this.state;
    const length = renderedSteps.length;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (length <= 1 || (stepIndex + 1) === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  }

  isFirstPosition(step) {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitUserMessage();
    }
  }

  handleSubmitButton() {
    this.submitUserMessage();
  }

  submitUserMessage() {
    const {
      defaultUserSettings,
      inputValue,
      previousSteps,
      renderedSteps,
    } = this.state;
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: inputValue,
      };

      currentStep = Object.assign(
        {},
        defaultUserSettings,
        currentStep,
        step,
      );

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
        disabled: true,
        inputValue: '',
      });
    }
  }

  checkInvalidInput() {
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== 'boolean' || !result) {
      this.setState({
        inputValue: result.toString(),
        inputInvalid: true,
        disabled: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            inputValue: value,
            inputInvalid: false,
            disabled: false,
          }, () => {
            this.input.focus();
          });
        }, 2000);
      });

      return true;
    }

    return false;
  }

  toggleChatBot(opened) {
    if (this.props.toggleFloating) {
      this.props.toggleFloating({ opened });
    } else {
      this.setState({ opened });
    }
  }

  renderStep(step, index) {
    const { renderedSteps } = this.state;
    const {
      avatarStyle,
      bubbleStyle,
      customStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { options, component, asMessage } = step;
    const steps = this.generateRenderedStepsById();
    const previousStep = index > 0 ? renderedSteps[index - 1] : {};

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          triggerNextStep={this.triggerNextStep}
          bubbleStyle={bubbleStyle}
        />
      );
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        bubbleStyle={bubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  }

  render() {
    const {
      disabled,
      inputInvalid,
      inputValue,
      opened,
      renderedSteps,
    } = this.state;
    const {
      className,
      contentStyle,
      floating,
      footerStyle,
      headerComponent,
      headerTitle,
      hideHeader,
      hideSubmitButton,
      inputStyle,
      placeholder,
      style,
      submitButtonStyle,
      width,
    } = this.props;

    const header = headerComponent || (
      <Header
        className="rsc-header"
      >
        <HeaderTitle className="rsc-header-title">
          {headerTitle}
        </HeaderTitle>
        {
          floating &&
          <HeaderIcon
            className="rsc-header-close-button"
            onClick={() => this.toggleChatBot(false)}
          >
            <CloseIcon />
          </HeaderIcon>
        }
      </Header>
    );

    return (
      <div className={`rsc ${className}`}>
        {
          floating &&
          <FloatButton
            className="rsc-float-button"
            opened={opened}
            onClick={() => this.toggleChatBot(true)}
          >
            <ChatIcon />
          </FloatButton>
        }
        <ChatBotContainer
          className="rsc-container"
          floating={floating}
          opened={opened}
          style={style}
          width={width}
        >
          {!hideHeader && header}
          <Content
            className="rsc-content"
            innerRef={contentRef => this.content = contentRef}
            floating={floating}
            style={contentStyle}
          >
            {_.map(renderedSteps, this.renderStep)}
          </Content>
          <Footer
            className="rsc-footer"
            style={footerStyle}
          >
            <Input
              type="textarea"
              style={inputStyle}
              innerRef={inputRef => this.input = inputRef}
              className="rsc-input"
              placeholder={inputInvalid ? '' : placeholder}
              onKeyPress={this.handleKeyPress}
              onChange={this.onValueChange}
              value={inputValue}
              floating={floating}
              invalid={inputInvalid}
              disabled={disabled}
              hasButton={!hideSubmitButton}
            />
            {
              !hideSubmitButton &&
              <SubmitButton
                className="rsc-submit-button"
                style={submitButtonStyle}
                onClick={this.handleSubmitButton}
                invalid={inputInvalid}
                disabled={disabled}
              >
                <SubmitIcon />
              </SubmitButton>
            }
          </Footer>
        </ChatBotContainer>
      </div>
    );
  }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.object,
  botAvatar: PropTypes.string,
  botDelay: PropTypes.number,
  bubbleStyle: PropTypes.object,
  cache: PropTypes.bool,
  cacheName: PropTypes.string,
  className: PropTypes.string,
  contentStyle: PropTypes.object,
  customDelay: PropTypes.number,
  customStyle: PropTypes.object,
  floating: PropTypes.bool,
  footerStyle: PropTypes.object,
  handleEnd: PropTypes.func,
  headerComponent: PropTypes.element,
  headerTitle: PropTypes.string,
  hideBotAvatar: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  inputStyle: PropTypes.object,
  opened: PropTypes.bool,
  toggleFloating: PropTypes.func,
  placeholder: PropTypes.string,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  userAvatar: PropTypes.string,
  userDelay: PropTypes.number,
  width: PropTypes.string,
};

ChatBot.defaultProps = {
  avatarStyle: {},
  botDelay: 2000,
  bubbleStyle: {},
  cache: false,
  cacheName: 'rsc_cache',
  className: '',
  contentStyle: {},
  customStyle: {},
  customDelay: 1000,
  floating: true,
  footerStyle: {},
  handleEnd: undefined,
  headerComponent: undefined,
  headerTitle: 'Chat',
  hideBotAvatar: false,
  hideHeader: false,
  hideSubmitButton: false,
  hideUserAvatar: false,
  inputStyle: {},
  opened: undefined,
  placeholder: 'Type the message ...',
  style: {},
  submitButtonStyle: {},
  toggleFloating: undefined,
  userDelay: 1000,
  width: '350px',
  botAvatar: 'http://giftthecode.ca/assets/img/2017/charities/charity-reps/Sis_CharlotteEmpeyc.png',
  userAvatar: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTIwOC41IDIxIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0yMDguNSAyMSAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PGNpcmNsZSBjeD0iLTE1OC41IiBjeT0iNzEiIGZpbGw9IiNGNUVFRTUiIGlkPSJNYXNrIiByPSI1MCIvPjxnPjxkZWZzPjxjaXJjbGUgY3g9Ii0xNTguNSIgY3k9IjcxIiBpZD0iTWFza18yXyIgcj0iNTAiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzRfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18yXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIiBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyICAgICBjMC0xLjcsMC02LjMsMC02LjNoLTE1aC0xNWMwLDAsMCw0LjYsMCw2LjNjMCw4LjctNC41LDExLjMtNywxMmMtNi44LDEuOS0yOC4xLDcuMy0yOC4xLDYuN3YxNGg1MC4xSC0xMDguNXoiIGZpbGw9IiNFNkMxOUMiIGlkPSJNYXNrXzNfIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIj48ZGVmcz48cGF0aCBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyYzAtMS43LDAtNi4zLDAtNi4zaC0xNWgtMTVjMCwwLDAsNC42LDAsNi4zICAgICAgIGMwLDguNy00LjUsMTEuMy03LDEyYy02LjgsMS45LTI4LjEsNy4zLTI4LjEsNi43djE0aDUwLjFILTEwOC41eiIgaWQ9Ik1hc2tfMV8iLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzVfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18xXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNV8pIiBkPSJNLTE1OC41LDEwMC4xYzEyLjcsMCwyMy0xOC42LDIzLTM0LjQgICAgICBjMC0xNi4yLTEwLjMtMjQuNy0yMy0yNC43cy0yMyw4LjUtMjMsMjQuN0MtMTgxLjUsODEuNS0xNzEuMiwxMDAuMS0xNTguNSwxMDAuMXoiIGZpbGw9IiNENEIwOEMiIGlkPSJoZWFkLXNoYWRvdyIvPjwvZz48L2c+PHBhdGggZD0iTS0xNTguNSw5NmMxMi43LDAsMjMtMTYuMywyMy0zMWMwLTE1LjEtMTAuMy0yMy0yMy0yM3MtMjMsNy45LTIzLDIzICAgIEMtMTgxLjUsNzkuNy0xNzEuMiw5Ni0xNTguNSw5NnoiIGZpbGw9IiNGMkNFQTUiIGlkPSJoZWFkIi8+PC9nPjwvc3ZnPg==',
};

export default ChatBot;
