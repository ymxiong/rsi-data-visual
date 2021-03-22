import { Size, defaultElementSize } from '../utils/Size';
import ElementState from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  width: number;
  height: number;
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
    width: size.width,
    height: size.height,
    anchored: false,
    linkSourceIds: [],
    linkTargetIds: [],
  };
}

export { ElementView, buildFromElementState };
