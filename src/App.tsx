import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import VisualDiagram from './VisualDiagram';
import { configureStore } from './VisualDiagram/store';

const App: React.FC = () => {
  const storeRef = useRef(configureStore());

  return (
    <Provider store={storeRef.current}>
      <VisualDiagram></VisualDiagram>
    </Provider>
  );
};

export default App;
