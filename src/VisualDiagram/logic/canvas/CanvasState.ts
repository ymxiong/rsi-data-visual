import { Canvas } from './Canvas';

type CanvasState = {
  id: string;
  scale: number;
};

const buildCanvasStateFromCanvas = (canvas: Canvas): CanvasState => {
  return canvas.state;
};

export { CanvasState, buildCanvasStateFromCanvas };
