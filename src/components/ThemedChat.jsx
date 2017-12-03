import React from 'react';
import { ThemeProvider } from 'styled-components';
import Chat from './Chat';

const theme = require ('./data/theme.json');

const ThemedChat = () => (
  <ThemeProvider theme = { theme }>
    <Chat />
  </ThemeProvider>
);

export default ThemedChat;
