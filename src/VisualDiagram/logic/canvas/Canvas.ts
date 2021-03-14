import ElementState from '../element/ElementState';
import LinkState from '../link/LinkState';
import Point from '../utils/Point';

type Canvas = {
  id: string;
  state: CanvasState;
  offset: Point;
};

export { Canvas };
