import { Point, standardOffset, standardSize } from '../utils/Point';
import { CanvasState } from './CanvasState';

type Canvas = {
  id: string;
  state: CanvasState;
  anchored: boolean;
  offset: Point;
  width: number;
  height: number;
};

const canvasStateTemplate: CanvasState = {
  id: 'testCanvasState',
  scale: 1,
};

const buildCanvasFromCanvasState = (
  state: CanvasState = { ...canvasStateTemplate },
): Canvas => {
  const canvas = {
    id: state.id,
    state,
    offset: {
      ...standardOffset,
      // ...zeroOffset,
    },
    anchored: false,
    width: standardSize.x,
    height: standardSize.y,
  };
  return canvas;
};

export { Canvas, buildCanvasFromCanvasState };
