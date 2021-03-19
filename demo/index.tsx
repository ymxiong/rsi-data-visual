import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import VisualDiagram from '../src';
import {
  elementComponents,
  toolbarState,
  viewStateTemplate,
} from './test/TEST_SIMPLE_VIEW/ViewStateTemplate';

const App = () => {
  const visualDiagramRef = useRef<any>(null);

  useEffect(() => {
    if (visualDiagramRef.current) {
      visualDiagramRef.current.setView(viewStateTemplate);
      visualDiagramRef.current.selectToolbarItems(['create', 'plus']);
    }
  }, []);

  const handleChange = (viewState: any) => {
    console.log('onChange', viewState);
  };

  return (
    <div style={{ width: '100%', height: '900px' }}>
      <VisualDiagram
        elementComponents={elementComponents}
        toolbarState={toolbarState}
        ref={visualDiagramRef}
        onChange={handleChange}
      />
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
