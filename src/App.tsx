import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import Diagram from './diagram/Diagram';
import { configureStore } from './store';

const App: React.FC = () => {
  const storeRef = useRef(configureStore());

  return (
    <Provider store={storeRef.current}>
      <Diagram></Diagram>
    </Provider>
  );
};

export default App;
