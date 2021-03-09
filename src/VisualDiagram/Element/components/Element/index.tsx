import React, { ComponentType, ReactNode } from 'react';
import LogicElement from '../../../../VisualLogic/LogicElement';
import { ElementStyle } from '../ElementStyle';

type ElementProps = {
  component: LogicElement;
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
        transform: `translate(${props.component.x}px, ${props.component.y}px)`,
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
