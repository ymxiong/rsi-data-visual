import React, { ComponentType, ReactNode } from 'react';
import Component from '../entity/Component';
import styled from 'styled-components';
import { ViewModeProps } from 'demo/Task/ViewMode';

const ComponentStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  user-select: none;
`;

type ComponentViewProps = {
  component: Component;
  children: ReactNode;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ComponentView = (props: ComponentViewProps) => (
  <ComponentStyle
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
  </ComponentStyle>
);

export type ComponentViewContainerProps = {
  id: string;
  component: Component;
};

export const ComponentHOC = (
  SubComponent: ComponentType<ViewModeProps>,
): React.FC<ComponentViewContainerProps> => {
  const ComponentViewContainer: React.FC<ComponentViewContainerProps> = (
    props,
  ) => {
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
      <ComponentView
        key={props.id}
        component={props.component}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <SubComponent {...props} />
      </ComponentView>
    );
  };
  return ComponentViewContainer;
};
