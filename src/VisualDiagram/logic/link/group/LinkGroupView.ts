import LinkGroupState from './LinkGroupState';

type LinkGroupView = {
  id: string;
  state: LinkGroupState;
};

function buildFromLinkGroupState(state: LinkGroupState): LinkGroupView {
  return {
    id: state.id,
    state,
  };
}

export { LinkGroupView, buildFromLinkGroupState };
