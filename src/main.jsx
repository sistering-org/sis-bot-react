import React from 'react';
import { render } from 'react-dom';
import Example from './components/Example';


class Apps extends React.Component {

  render() {
    return (
      
          
          <Example/>

    );
  }
}

render(
  <Apps/>,
  document.getElementById('root'),
);



