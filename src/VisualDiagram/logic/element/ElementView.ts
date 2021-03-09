import ElementState from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  anchored: boolean;
};

function buildFromElementState(state: ElementState): ElementView {
  return {
    id: state.id,
    state,
    anchored: false,
  };
}

export { ElementView, buildFromElementState };
