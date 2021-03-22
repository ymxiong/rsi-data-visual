import { ElementState } from '../element/ElementState';
import { LinkState } from '../link/LinkState';
import { Point } from '../utils/Point';
import { Canvas } from './Canvas';

type CanvasState = {
  id: string;
  scale: number;
};

const buildCanvasStateFromCanvas = (canvas: Canvas): CanvasState => {
  return canvas.state;
};

export { CanvasState, buildCanvasStateFromCanvas };
