import React, { ReactNode } from 'react';
import { ElementStyle } from '../ElementStyle';
import { ElementView } from '../../../logic/element/ElementView';
import { Point } from '../../../logic/utils/Point';

type ElementProps = {
  element: ElementView;
  offset: Point;
  children: ReactNode;
  handleRef: (element: HTMLDivElement) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Element = (props: ElementProps): JSX.Element => {
  return (
    <ElementStyle
      style={{
        transform: `translate(${props.element.state.x - props.offset.x}px, ${
          props.element.state.y - props.offset.y
        }px)`,
        cursor: 'pointer',
      }}
    >
      <div
        onMouseUp={props.onMouseUp}
        onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseLeave={props.onMouseLeave}
        role="presentation"
        ref={(div: HTMLDivElement) => props.handleRef(div)}
      >
        {props.children}
      </div>
    </ElementStyle>
  );
};
