import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import {
  refreshCanvas,
  refreshElement,
  selectElement,
} from '../store/canvas/actions';

import Canvas from './components/Canvas';
import { VisualComponentStyles, VisualToolbarState } from '../../../types';
import { Point } from '../logic/utils/Point';
import { zoomLevels } from '../logic/utils/Scale';
import { refreshToolbarItemBatch } from '../store/diagram/actions';
import { values } from 'lodash-es';

type CanvasContainerProps = {
  componentStyles: VisualComponentStyles;
  toolbarState: VisualToolbarState;
};

const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const dispatch = useDispatch();

  const canvas = useSelector((state: Store) => state.canvas.canvas);

  const view = useSelector((state: Store) => state.canvas.view);

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

  const handleResize = () => {};

  const handleKey = (ev: KeyboardEvent) => {
    if (ev.getModifierState('Meta') || ev.getModifierState('Control')) {
      switch (ev.key) {
        case 'z':
          ev.preventDefault();
          break;
        case 'y':
          ev.preventDefault();
          break;
        case 's':
          ev.preventDefault();
          break;
        // no default
      }
    }
  };

  const onCanvasMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvas.anchored) {
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshCanvas({ ...canvas, anchored: false }));
      } else {
        // 如果被铆钉，计算新的x，y值
        const newCanvas = { ...canvas };
        newCanvas.offset.x
          += ev.movementX * zoomLevels[zoomLevels.length - 1 - canvas.state.scale];
        newCanvas.offset.y
          += ev.movementY * zoomLevels[zoomLevels.length - 1 - canvas.state.scale];
        dispatch(refreshCanvas(newCanvas));
      }
    }

    // 滑出画布的监听问题
    if (
      view.selectedElementId
      && view.elements[view.selectedElementId].anchored
    ) {
      const anchoredElement = view.elements[view.selectedElementId];
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshElement({ ...anchoredElement, anchored: false }));
      } else {
        // 如果被铆钉，计算新的x，y值
        const refreshViewElement = { ...anchoredElement };
        const point: Point = {
          x:
            (ev.pageX - canvas.margin.x) / zoomLevels[canvas.state.scale]
            - canvas.offset.x
            + view.offset.x
            - anchoredElement.width / 2,
          y:
            (ev.pageY - canvas.margin.y) / zoomLevels[canvas.state.scale]
            - canvas.offset.y
            + view.offset.y
            - anchoredElement.height / 2,
        };
        refreshViewElement.state.x = point.x;
        refreshViewElement.state.y = point.y;
        dispatch(refreshElement(refreshViewElement));
      }
    }
  };

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(refreshCanvas({ ...canvas, anchored: true }));
  };

  const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvas({ ...canvas, anchored: false }));
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCanvasMove(ev);
  };

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvas({ ...canvas, anchored: false }));
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    dispatch(refreshToolbarItemBatch(values(props.toolbarState)));
  }, []);

  return (
    <Canvas
      componentStyles={props.componentStyles}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      handleRef={handleRef}
    />
  );
};

export default React.memo(CanvasContainer);
