import { LinkState } from './LinkState';

type LinkView = {
  id: string;
  state: LinkState;
};

function buildFromLinkState(state: LinkState): LinkView {
  return {
    id: state.id,
    state,
  };
}

export { LinkView, buildFromLinkState };
