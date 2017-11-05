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

import EndCallback from './EndCallback';


const iframe = '<iframe width="300" height="215"src="https://www.youtube.com/embed/R-w2cgTtELQ?ecver=1"></iframe>';


const ThemedExample = () => (
  <ThemeProvider theme = { otherFontTheme }>
    <EndCallback iframe ={iframe}/>
  </ThemeProvider>
);

export default ThemedExample;
