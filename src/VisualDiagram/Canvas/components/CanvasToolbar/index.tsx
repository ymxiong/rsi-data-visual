import React, { useEffect } from 'react';
import { ToolbarStyle } from './components/ToolbarStyle';

type CanvasToolbarProps = {
  onCreateNewElementOnCanvas: () => void;
};

const CanvasToolbar = (props: CanvasToolbarProps): JSX.Element => {
  return (
    <ToolbarStyle>
      {/* <Tooltip title="保存模型"> */}
      <span>
        <div onClick={props.onCreateNewElementOnCanvas}>新增元素</div>
      </span>
      <span>
        <div>新增链接</div>
      </span>
      <span>
        <div>保存</div>
      </span>
      <span>
        <div>放大</div>
      </span>
      <span>
        <div>缩小</div>
      </span>
      <span>
        <div>整理</div>
      </span>
      <span>
        <div>撤销</div>
      </span>
      <span>
        <div>重做</div>
      </span>
    </ToolbarStyle>
  );
};

export default CanvasToolbar;
