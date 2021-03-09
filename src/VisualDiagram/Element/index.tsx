import React, { ComponentType, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshElement } from '../store/canvas/actions';
import styled from 'styled-components';
import { ViewModeProps } from 'demo/Task/ViewMode';
import { Element } from './components/Element';
import ElementView from '../logic/element/ElementView';

export type ElementContainerProps = {
  id: string;
  element: ElementView;
};

export const ElementHOC = (
  SubComponent: ComponentType<ViewModeProps>,
): React.FC<ElementContainerProps> => {
  const ElementContainer: React.FC<ElementContainerProps> = (props) => {
    const dispatch = useDispatch();

    let moveFlag = false;

    const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      // console.log('entity down');
      moveFlag = true;
    };

    const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        // console.log('entity up');
        moveFlag = false;
      }
    };

    const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        // console.log('entity move', ev.clientX, ev.clientY);
      }
    };

    const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveFlag) {
        moveFlag = false;
        dispatch(
          refreshElement({ ...props.element, x: ev.clientX, y: ev.clientY }),
        );
      }
    };

    return (
      <Element
        key={props.id}
        element={props.element}
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
