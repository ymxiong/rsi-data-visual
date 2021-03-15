import { Point, standardOffset } from '../utils/Point';
import { Size, standardSize } from '../utils/Size';
import { CanvasState } from './CanvasState';

type Canvas = {
  id: string;
  state: CanvasState;
  anchored: boolean;
  offset: Point;
  size: Size;
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
    size: { ...standardSize },
  };
  return canvas;
};

export { Canvas, buildCanvasFromCanvasState };
