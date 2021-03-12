import { LinkView } from '../link/LinkView';
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

function buildFromElementState(state: ElementState): ElementView {
  return {
    id: state.id,
    state,
    width: 100,
    height: 100,
    anchored: false,
    linkSourceIds: [],
    linkTargetIds: [],
  };
}

export { ElementView, buildFromElementState };
