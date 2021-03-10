import React, { ComponentType, FunctionComponentElement } from 'react';
// import reducer from './reducer';
import CanvasContainer from './Canvas';

export type CustomComponents = {
  [type: string]: {
    component: ComponentType;
    icon: {
      path: FunctionComponentElement<any>;
      size: number;
    };
  };
};

type VisualDiagramProps = { customComponents?: CustomComponents };

const VisualDiagram = (props: VisualDiagramProps) => {
  return <CanvasContainer customComponents={props.customComponents} />;
};

export default VisualDiagram;
