import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import {
  refreshCanvas,
  refreshElement,
  refreshView,
  selectElement,
} from '../store/canvas/actions';

import Canvas from './components/Canvas';
import { values } from 'lodash-es';
import { VisualComponentStyles } from '..';

type CanvasContainerProps = {
  componentStyles: VisualComponentStyles;
};

const CanvasContainer: React.FC<CanvasContainerProps> = (props) => {
  const dispatch = useDispatch();

  const canvas = useSelector((state: Store) => state.canvas.canvas);

  const view = useSelector((state: Store) => state.canvas.view);

  let canvasDOM: HTMLDivElement | undefined;

  const handleRef = (div: HTMLDivElement) => {
    canvasDOM = div;
  };

  const handleResize = () => {
    if (canvasDOM) {
      // this.props.configViewport();
    }
  };

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
        newCanvas.offset.x += ev.movementX;
        newCanvas.offset.y += ev.movementY;
        dispatch(refreshCanvas(newCanvas));
      }
    }

    // 滑出画布的监听问题
    if (view.selectedElementId && view.elements[view.selectedElementId].anchored) {
      const anchoredElement = view.elements[view.selectedElementId];
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshElement({ ...anchoredElement, anchored: false }));
      } else {
        // 如果被铆钉，计算新的x，y值
        const refreshViewElement = { ...anchoredElement };
        refreshViewElement.state.x = ev.pageX - anchoredElement.width / 2;
        refreshViewElement.state.y = ev.pageY - anchoredElement.height / 2;
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
