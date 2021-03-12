import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToolbarDiv } from './components/ToolbarDiv';

type CanvasProps = {
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const CanvasToolbar = (props: CanvasProps): JSX.Element => {
  return (
    <ToolbarDiv>
      {/* <Tooltip title="保存模型">
          <span
            className={styles.bottomSheetDiv}
            onClick={this.handleIntervalVisualModelUpload}
          >
            <CloudUploadOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip>

        <Tooltip title="容灾选项">
          <span
            className={styles.bottomSheetDiv}
            onClick={this.handleDisasterDrawer}
          >
            <ClusterOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip>

        <Tooltip title="自动整理">
          <span
            className={styles.bottomSheetDiv}
            onClick={this.handleReorganize}
          >
            <SyncOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip>

        <Tooltip title="撤销上一步(暂不支持)">
          <span className={styles.bottomSheetDiv} onClick={this.handleDrawer}>
            <UndoOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip>

        <Tooltip title="放大(暂不支持)">
          <span className={styles.bottomSheetDiv} onClick={this.handleDrawer}>
            <ZoomInOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip>

        <Tooltip title="缩小(暂不支持)">
          <span className={styles.bottomSheetDiv} onClick={this.handleDrawer}>
            <ZoomOutOutlined className={styles.bottomSheetButton} />
          </span>
        </Tooltip> */}
    </ToolbarDiv>
  );
};

export default CanvasToolbar;
