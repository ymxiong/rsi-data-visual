import React, { ComponentType, FunctionComponentElement } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import CanvasContainer from '../canvas/CanvasContainer';

export const store = createStore(reducer);

export type CustomComponents = {
  [type: string]: {
    component: ComponentType;
    icon: {
      path: FunctionComponentElement<any>;
      size: number;
    };
  };
};

type DiagramProps = { customComponents: CustomComponents };

const Diagram = (props: DiagramProps) => (
  <Provider store={store}>
    <CanvasContainer customComponents={props.customComponents} />
  </Provider>
);

export default Diagram;
