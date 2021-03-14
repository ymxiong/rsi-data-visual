import Point from '../utils/Point';
import { CanvasState } from './CanvasState';

type Canvas = {
  id: string;
  state: CanvasState;
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
      x: 0,
      y: 0,
    },
  };
  return canvas;
};

export { Canvas, buildCanvasFromCanvasState };
