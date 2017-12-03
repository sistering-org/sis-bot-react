import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const Steps = require("./data/questions.json").steps;
const Config = require('./data/config.json');

class Chat extends React.Component {
    constructor(props) {
      super(props);
    }

  constructIframe (iframe) {
    return (
      <div>
        <iframe {...this.getAttrs(iframe)} />
      </div>
    )
  }

  getAttrs (iframeTag) {
    var doc = document.createElement('div');
    doc.innerHTML = iframeTag;
    const iframe = doc.getElementsByTagName('iframe')[0];
    return [].slice
      .call(iframe.attributes)
      .reduce((attrs, element) => {
        attrs[element.name] = element.value;
        return attrs;
      }, { } );
  }


  constructSteps (Steps){
    let constructed_steps = [];    
    Steps.forEach(step => {
      if (step.iframe == true){    
        step.component = this.constructIframe(step.message);
        delete step.iframe;
        delete step.message;
      }
    });
    return Steps;
  }


  render () {
    return (
       <div className="docs-example-1">
        <ChatBot
            steps = {this.constructSteps(Steps)}
            {...Config}
        />
      </div>
    );
  }
}


export default Chat;