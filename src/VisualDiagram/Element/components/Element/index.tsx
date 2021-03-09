import React, { ComponentType, ReactNode } from 'react';
import { ElementStyle } from '../ElementStyle';
import { ElementView } from '../../../logic/element/ElementView';

type ElementProps = {
  element: ElementView;
  children: ReactNode;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Element = (props: ElementProps) => {
  return (
    <ElementStyle
      style={{
        transform: `translate(${props.element.state.x}px, ${props.element.state.y}px)`,
        cursor: 'pointer',
      }}
    >
      <div
        onMouseUp={props.onMouseUp}
        onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseLeave={props.onMouseLeave}
        role="presentation"
      >
        {props.children}
      </div>
      {/* {props.isSelected && <ContextMenu actions={contextMenuActions(props)} />} */}
    </ElementStyle>
  );
};
