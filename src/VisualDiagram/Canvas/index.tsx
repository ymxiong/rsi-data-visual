import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshCanvas } from '../store/canvas/actions';

import Canvas from './components/Canvas';
import { VisualComponentStyles, VisualToolbarState } from '../../../types';
import { refreshToolbarItemBatch } from '../store/diagram/actions';
import { values } from 'lodash-es';

type CanvasContainerProps = {
  componentStyles: VisualComponentStyles;
  toolbarState: VisualToolbarState;
};

const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const dispatch = useDispatch();

  const canvas = useSelector((state: Store) => state.canvas.canvas);

  let canvasDOM: HTMLDivElement | undefined;

  const handleRef = (div: HTMLDivElement) => {
    canvasDOM = div;
    if (canvasDOM) {
      const domRect = canvasDOM.getBoundingClientRect();
      if (domRect.x !== canvas.margin.x || domRect.y !== canvas.margin.y) {
        // 如果被铆钉，计算新的x，y值
        const newCanvas = { ...canvas };
        newCanvas.margin.x = domRect.x;
        newCanvas.margin.y = domRect.y;
        dispatch(refreshCanvas(newCanvas));
      }
    }
  };

  useEffect(() => {
    dispatch(refreshToolbarItemBatch(values(props.toolbarState)));
  }, []);

  return (
    <Canvas componentStyles={props.componentStyles} handleRef={handleRef} />
  );
};

export default React.memo(CanvasContainer);
