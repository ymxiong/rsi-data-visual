import React, { ComponentType, ReactNode } from 'react';
import LogicElement from '../../VisualLogic/LogicElement';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import styled from 'styled-components';
import { ViewModeProps } from 'demo/Task/ViewMode';
import { Element } from './components/Element';

export type ElementContainerProps = {
  id: string;
  component: LogicElement;
};

export const ElementHOC = (
  SubComponent: ComponentType<ViewModeProps>,
): React.FC<ElementContainerProps> => {
  const ElementContainer: React.FC<ElementContainerProps> = (props) => {
    let moveFlag = false;

    const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      console.log('entity down');
      moveFlag = true;
    };

    const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        console.log('entity up');
        moveFlag = false;
      }
    };

    const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        console.log('entity move', ev.clientX, ev.clientY);
      }
    };

    const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        console.log('entity leave');
        moveFlag = false;
      }
    };

    return (
      <Element
        key={props.id}
        component={props.component}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <SubComponent {...props} />
      </Element>
    );
  };
  return ElementContainer;
};
