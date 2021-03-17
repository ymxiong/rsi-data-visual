import React from 'react';
import { VisualComponentProps } from '../../../../types';
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

export type ViewModeProps = VisualComponentProps;

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
      style={computeStyle(props.element.width, props.element.height)}
      draggable="false"
    >
      {props.element.state.name && (
        <ModelTitle
          modelTitle={props.element.state.name}
          color={props.element.state.color}
        />
      )}
      {/* {Body} */}
      <ModelFooter />
      {/* // onCollapseChange={onChange}
      // isCollapsed={isCollapsed} */}
    </ul>
  );
};

export default ViewMode;
