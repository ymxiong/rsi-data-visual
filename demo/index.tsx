import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import VisualDiagram from '../src';
import {
  componentStyles,
  viewStateTemplate,
} from './test/TEST_SIMPLE_VIEW/ViewStateTemplate';

const App = () => {
  const visualDiagramRef = useRef<any>(null);

  useEffect(() => {
    if (visualDiagramRef.current) {
      visualDiagramRef.current.setView(viewStateTemplate);
    }
  }, []);

  const handleChange = (viewState: any) => {
    console.log('onChange', viewState);
  };

  return (
    <div>
      <VisualDiagram
        componentStyles={componentStyles}
        ref={visualDiagramRef}
        onChange={handleChange}
      />
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
