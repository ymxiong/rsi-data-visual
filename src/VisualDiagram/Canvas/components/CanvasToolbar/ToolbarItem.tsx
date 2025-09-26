import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import StyledTooltip from '../../../../components/StyledTooltip';

import { VisualToolbarProps } from '../../../../../types';

const ToolbarIcon = styled(SVG)`
  width: 30px;
  height: 30px;
  path {
    fill: #1890ff;
  }
`;

const ToolbarButton = styled.div`
  flex: 1;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const CanvasToolbarItem = (props: VisualToolbarProps): JSX.Element => {
  return (
    <StyledTooltip
      overlay={props.tips}
      placement="right"
      builtinPlacements={{}}
      onPopupAlign={() => {}}
    >
      <ToolbarButton onClick={props.onClick} id={props.id}>
        <ToolbarIcon src={props.icon}></ToolbarIcon>
      </ToolbarButton>
    </StyledTooltip>
  );
};
