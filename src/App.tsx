import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import VisualDiagram, { VisualDiagramProps } from './VisualDiagram';
import { configureStore } from './VisualDiagram/store';

const App: React.FC<VisualDiagramProps> = (props) => {
  const storeRef = useRef(configureStore());

  return (
    <Provider store={storeRef.current}>
      <VisualDiagram {...props}></VisualDiagram>
    </Provider>
  );
};

export default App;
