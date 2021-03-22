import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshCanvasMargin } from '../store/canvas/actions';

import Canvas from './components/Canvas';
import { VisualCanvasConfig } from '../../../types';
import { refreshToolbarItemBatch } from '../store/diagram/actions';
import { values } from 'lodash-es';

type CanvasContainerProps = {
  canvasConfig: VisualCanvasConfig;
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
        }
      }
    },
    [canvasMargin, dispatch],
  );

  useEffect(() => {
    dispatch(refreshToolbarItemBatch(values(props.canvasConfig.toolbarConfig)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas
      elementConfig={props.canvasConfig.elementConfig}
      linkConfig={props.canvasConfig.linkConfig}
      globalConfig={props.canvasConfig.toolbarConfig}
      handleRef={handleRef}
    />
  );
};

export default React.memo(CanvasContainer);
