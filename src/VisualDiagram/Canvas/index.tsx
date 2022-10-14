import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../store/hooks';
import { Store } from '../store';
import {
  refreshCanvasMargin,
  refreshCanvasViewportSize,
} from '../store/canvas/actions';

import Canvas from './components/Canvas';
import { VisualCanvasConfig } from '../../../types';
import { refreshToolbarItemBatch } from '../store/diagram/actions';

type CanvasContainerProps = {
  canvasConfig: VisualCanvasConfig;
  loading: boolean;
};

const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const dispatch = useDispatch();

  const canvasMargin = useSelector(
    (state: Store) => state.canvas.canvas.margin,
  );

  const handleRef = useCallback(
    (div: HTMLDivElement) => {
      const canvasDOM = div;
      if (canvasDOM) {
        const domRect = canvasDOM.getBoundingClientRect();
        if (domRect.x !== canvasMargin.x || domRect.y !== canvasMargin.y) {
          canvasMargin.x = domRect.x;
          canvasMargin.y = domRect.y;
          dispatch(refreshCanvasMargin(canvasMargin));
          dispatch(
            refreshCanvasViewportSize({
              height: domRect.height,
              width: domRect.width,
            }),
          );
        }
      }
    },
    [canvasMargin, dispatch],
  );

  useEffect(() => {
    dispatch(refreshToolbarItemBatch(props.canvasConfig.toolbarConfig));
  }, [dispatch, props.canvasConfig]);

  return (
    <Canvas
      elementConfig={props.canvasConfig.elementConfig}
      linkConfig={props.canvasConfig.linkConfig}
      globalConfig={props.canvasConfig.globalConfig}
      loading={props.loading}
      handleRef={handleRef}
    />
  );
};

export default React.memo(CanvasContainer);
