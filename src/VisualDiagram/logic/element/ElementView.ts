import { Point } from '../utils/Point';
import { Size, defaultElementSize } from '../utils/Size';
import { ElementState } from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  size: Size;
  mouseOffset: Point;
  anchored: boolean;
  linkSourceIds: string[];
  linkTargetIds: string[];
};

function buildFromElementState(
  state: ElementState,
  size: Size = { ...defaultElementSize },
): ElementView {
  return {
    id: state.id,
    state,
    size: { ...size },
    mouseOffset: { x: 0, y: 0 },
    anchored: false,
    linkSourceIds: [],
    linkTargetIds: [],
  };
}

export { ElementView, buildFromElementState };
