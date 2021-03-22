import { Size, defaultElementSize } from '../utils/Size';
import { ElementState } from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  size: Size;
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
    anchored: false,
    linkSourceIds: [],
    linkTargetIds: [],
  };
}

export { ElementView, buildFromElementState };
