import { Point, standardOffset, zeroOffset } from '../utils/Point';
import { CanvasState } from './CanvasState';

type Canvas = {
  id: string;
  state: CanvasState;
  anchored: boolean;
  offset: Point;
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
      ...zeroOffset,
    },
  };
  return canvas;
};

export { Canvas, buildCanvasFromCanvasState };
