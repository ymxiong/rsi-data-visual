import React from 'react';
import Component from '../../src/entity/Component';
import ModelFooter from './ModelFooter';
import { ModelTitle } from './ModelTitle';

const modelStyle = {
  backgroundColor: '#fff',
  fontSize: '14px',
  border: '1px solid #eee',
  boxShadow: '2px 2px 2px #ccc',
  borderRadius: '5px',
  minWidth: '160px',
  minHeight: '62px',
  color: '#333',
};

export interface ViewModeProps {
  component: Component;
}

const ViewMode: React.FC<ViewModeProps> = (props: ViewModeProps) => {
  const computeStyle = (width = 160, height = 62) => ({
    ...modelStyle,
    minWidth: `${width}px`,
    minHeight: `${height}px`,
  });

  let isCollapsed = true;

  const onChange = (collapsed: boolean) => {
    isCollapsed = collapsed;
  };

  return (
    <ul
      style={computeStyle(props.component.width, props.component.height)}
      draggable="false"
    >
      {props.component.name && (
        <ModelTitle
          modelTitle={props.component.name}
          color={props.component.color}
        />
      )}
      {/* {Body} */}
      <ModelFooter onCollapseChange={onChange} isCollapsed={isCollapsed} />
    </ul>
  );
};

export default ViewMode;
