import React, { ComponentType, FunctionComponentElement, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { updateId } from '../store/diagram/actions';
// import reducer from './reducer';
import CanvasContainer from '../canvas/CanvasContainer';

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

const Diagram = (props: DiagramProps) => {
  const id = useSelector((state: Store) => state.diagram.id);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateId('test'));
  };

  // return <div onClick={handleUpdate}>{`当前id:${id}`}</div>;

  return <CanvasContainer customComponents={props.customComponents} />;
};

export default Diagram;
