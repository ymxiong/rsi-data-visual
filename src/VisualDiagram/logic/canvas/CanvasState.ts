import { Canvas } from './Canvas';

type CanvasState = {
  id: string;
  scale: number;
  locked: boolean;
};

const buildCanvasStateFromCanvas = (canvas: Canvas): CanvasState => {
  return canvas.state;
};

export { CanvasState, buildCanvasStateFromCanvas };
