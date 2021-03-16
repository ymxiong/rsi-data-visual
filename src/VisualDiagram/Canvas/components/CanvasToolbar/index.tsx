import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import StyledTooltip from '../../../../components/StyledTooltip';
import plusIcon from '../../../../assets/icons/plus.svg';
import linkIcon from '../../../../assets/icons/link.svg';
import uploadIcon from '../../../../assets/icons/upload.svg';
import zoomIn from '../../../../assets/icons/zoomIn.svg';
import zoomOut from '../../../../assets/icons/zoomOut.svg';
import sort from '../../../../assets/icons/sort.svg';
import cut from '../../../../assets/icons/cut.svg';
import undo from '../../../../assets/icons/undo.svg';
import redo from '../../../../assets/icons/redo.svg';

const ToolbarStyle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 15px;
  width: 60px;
  height: 90%;
  margin: auto;
  padding: 20px 5px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const ToolbarIcon = styled(SVG)`
  width: 30px;
  height: 30px;
  path {
    fill: #1890ff;
  }
`;

type CanvasToolbarProps = {
  onCreateElement: () => void;
};

const CanvasToolbar = (props: CanvasToolbarProps): JSX.Element => {
  return (
    <ToolbarStyle>
      {/* <Tooltip title="保存模型"> */}
      <StyledTooltip overlay="新增元素" placement="right">
        <ToolbarButton onClick={props.onCreateElement}>
          <ToolbarIcon src={plusIcon}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="新增链接" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={linkIcon}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="保存" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={uploadIcon}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="放大" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={zoomIn}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="缩小" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={zoomOut}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="整理" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={sort}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="剪裁" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={cut}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="撤销" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={undo}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
      <StyledTooltip overlay="重做" placement="right">
        <ToolbarButton>
          <ToolbarIcon src={redo}></ToolbarIcon>
        </ToolbarButton>
      </StyledTooltip>
    </ToolbarStyle>
  );
};

export default CanvasToolbar;
