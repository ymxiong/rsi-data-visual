import React, { ComponentType } from 'react';
// import reducer from './reducer';
import CanvasContainer from './Canvas';

export type VisualDiagramComponents = {
  [type: string]: {
    elementStyle: ComponentType<any>;
  };
};

export type VisualDiagramProps = { components: VisualDiagramComponents };

const VisualDiagram = (props: VisualDiagramProps) => {
  return <CanvasContainer components={props.components} />;
};

export default VisualDiagram;
