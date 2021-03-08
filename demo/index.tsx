import React from 'react';
import ReactDOM from 'react-dom';
import Diagram from '../src/diagram/Diagram';
import taskIcon from './icon';

const App = () => (
  <div>
    <Diagram />
  </div>
);

ReactDOM.render(<App></App>, document.getElementById('root'));
