import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  // question 1
  {
    id: 1,
    message: 'Thank you for expressing your interest! would you like to know about our voluteering opportunities?',
    trigger: 2,
  },
  {
    id: 2,
    options: [
      { value: 1, label: 'yes', trigger: 3 },
      { value: 2, label: 'no', trigger: 4 },
    ],
  },
  // question 2
  {
    id: 3,
    message: 'Here are our volunteering opportunities:',
    trigger: 4,
  },
  {
    id: 4,
    options: [
      { value: 1, label: 'Program Volunteer', trigger: 5 },
      { value: 2, label: 'Occasional Volunteering', trigger: 6 },
      { value: 3, label: 'Kitchen Support', trigger: 7 },
    ],
  },
  //----
  // Program Volunteer
  //---
  {
    id: 5,
    message: 'use their hobbies and specialized skills to run groups or workshops such as ESL classes, aromatherapy, massage, yoga, facials/manicures, beading, crafts, etc. We have these dates available, If you\'d like to volunteer please choose an available date',
    trigger: 8,
  },
  {
    id: 8,
    options: [
      { value: 1, label: 'November 12h 7pm', trigger: 11 },
      { value: 2, label: 'November 22th 8pm', trigger: 11 },
      { value: 3, label: 'November 30th 8pm', trigger: 11 },
      { value: 4, label: 'Choose another opportunity', trigger: 3 },
    ],
  },
  //----
  // Occasional Volunteering
  //---
  {
    id: 6,
    message: 'Occasional volunteers help with special events, outings, and seasonal projects',
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
    message: 'Kitchen volunteers help prep and serve meals to participants',
    trigger: 10,
  },
  {
    id: 10,
    options: [
      { value: 1, label: 'November 12h 7pm', trigger: 11 },
      { value: 2, label: 'November 22th 8pm', trigger: 11 },
      { value: 3, label: 'November 30th 8pm', trigger: 11 },
      { value: 4, label: 'Choose another opportunity', trigger: 3 },
    ],
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
    end: true,
  },
];

const ThemedExample = () => (
  <ThemeProvider theme = { otherFontTheme }>
    <ChatBot steps = { steps }/>
  </ThemeProvider>
);

export default ThemedExample;
