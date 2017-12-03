import React from 'react';
import { render } from 'react-dom';
import ThemedChat from './components/ThemedChat';


class Apps extends React.Component {

  render() {
    return (     
          <ThemedChat/>
    );
  }
}

render(
  <Apps/>,
  document.getElementById('root'),
);



