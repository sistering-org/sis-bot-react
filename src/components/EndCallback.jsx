import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const getAttrs = (iframeTag) => {
  var doc = document.createElement('div');
  doc.innerHTML = iframeTag;

  const iframe = doc.getElementsByTagName('iframe')[0];
  return [].slice
    .call(iframe.attributes)
    .reduce((attrs, element) => {
      attrs[element.name] = element.value;
      return attrs;
    }, {});
}

class EndCallback extends React.Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  iframe () {
    return {
      __html: this.props.iframe
    }
  }


  handleEnd({ steps, values }) {
   
  }

  render() {
    return (
       <div className="docs-example-1">
        <ChatBot
            handleEnd={this.handleEnd}
            steps={[
          {
            id: 1,
            message: '\Hi there! Welcome to our Sistering volunteering page. Would you like to know about our voluteering opportunities?',
            trigger: 2,
          },
          {
            id: 2,
            options: [
              { value: 1, label: 'Yes, please', trigger: 3 },
              { value: 2, label: 'No, thank you', trigger: "bye" },
            ],
          },
          // question 2
          {
            id: 3,
            message: 'Sounds good! Here are our volunteering opportunities. Click on one to find out more.',
            trigger: 4,
          },
          {
            id: 4,
            options: [
              { value: 1, label: 'Program Volunteers', trigger: 5 },
              { value: 2, label: 'Occaisional Volunteers', trigger: 6 },
              { value: 3, label: 'Sisters Kitchen Volunteers', trigger: 7 },
            ],
          },
          //----
          // Program Volunteer
          //---
          {
            id: 5,
            message: 'Program volunteers use their hobbies and specialized skills to run groups or workshops such as ESL classes, aromatherapy, massage, yoga, facials/manicures, beading and crafts.',
            trigger: 9,
          },
          //----
          // Occasional Volunteering
          //---
          {
            id: 6,
            component: (
              <div>
              <iframe {...getAttrs(this.props.iframe) } />
            </div> 
              
            ),
            trigger: 9,
          },
          {
            id: 9,
            options: [
              { value: 1, label: 'November 12h 7pm', trigger: 11 },
              { value: 2, label: 'November 22th 8pm', trigger: 11 },
              { value: 3, label: 'November 30th 8pm', trigger: 11 },
              { value: 4, label: 'Choose another opportunity', trigger: 3 },
            ],
          },
          //----
          // Kitchen Support
          //---
          {
            id: 7,
            message: 'Nice! Volunteering in kitchen support, you will be help prepare and serve meals. Would you like to hear a user experience?',
            trigger: 10,
          },
          {
            id: 10,
            options: [
              { value: 1, label: 'Yes', trigger: "7y" },
              { value: 2, label: 'No', trigger: 3 },
            ],
          },
          {
            id: "7y",
            message: 'Here is ',
            trigger: 11,
          },
          // question 3
          {
            id: 11,
            message: 'Please Enter your email',
            trigger: 'email',
          },
          {
            id: 'email',
            user: true,
            validator: (value) => {
              let email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

              if (!value.match(email_regex)) {
                return 'not a valid email';
              }
              return true;
            },
            trigger: 'bye'
          },
          {
            id: 'bye',
            message: 'See ya later!',
            trigger: 'bye1',
          },
          {
            id: 'bye1',
            message: 'd',
            trigger: function(){
              window.location.href = 'http://sistering.org/';
            },
          },
          {
            id: 'volunteerOrientation',
            message: 'All weekly volunteers attend orientation and screening activities, which include:\n• An interview\n• An orientation session\n• Ongoing and on-the-job training and support\n• Diversity training and other volunteer workshops',
            trigger: function(){
              window.location.href = 'http://sistering.org/';
            },
          },
          {
            id: 'signUp',
            message: 'All weekly volunteers attend orientation and screening activities, which include:\n• An interview\n• An orientation session\n• Ongoing and on-the-job training and support\n• Diversity training and other volunteer workshops',
            trigger: function(){
              window.location.href = 'http://sistering.org/';
            },
          },
        ]}
        />
      </div>
    );
  }
}



export default EndCallback;