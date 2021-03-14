import React from 'react';
import ReactDOM from 'react-dom';
import VisualDiagram from '../src';
import {
  componentStyles,
  viewStateTemplate,
} from './test/TEST_SIMPLE_VIEW/ViewStateTemplate';

const App = () => (
  <div>
    <VisualDiagram
      componentStyles={componentStyles}
      viewState={viewStateTemplate}
    />
  </div>
);

ReactDOM.render(<App></App>, document.getElementById('root'));
