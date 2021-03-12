import React from 'react';
import ReactDOM from 'react-dom';
import VisualDiagram from '../src';
import { components } from './custom';

const App = () => (
  <div>
    <VisualDiagram components={components} />
  </div>
);

ReactDOM.render(<App></App>, document.getElementById('root'));
