import { SlotView } from '../slot/SlotView';
import { LinkState } from './LinkState';

type LinkView = {
  id: string;
  state: LinkState;
  slotFrom?: SlotView;
  slotTo?: SlotView;
};

const buildFromLinkState = (state: LinkState): LinkView => {
  return {
    id: state.id,
    state,
  };
};

export { LinkView, buildFromLinkState };
