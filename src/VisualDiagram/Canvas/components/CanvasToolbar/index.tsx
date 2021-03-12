import React, { useEffect } from 'react';
import { Button } from 'share';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetButtonStyle } from './components/BottomSheetButtonStyle';
import { ToolbarStyle } from './components/ToolbarStyle';

type CanvasToolbarProps = {
  onCreateNewElementOnCanvas: () => void;
};

const CanvasToolbar = (props: CanvasToolbarProps): JSX.Element => {
  return (
    <ToolbarStyle>
      {/* <Tooltip title="保存模型"> */}
      <span>
        <div onClick={props.onCreateNewElementOnCanvas}>新增</div>
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
