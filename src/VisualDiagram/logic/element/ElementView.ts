import ElementState from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  width: number;
  height: number;
  anchored: boolean;
};

function buildFromElementState(state: ElementState): ElementView {
  return {
    id: state.id,
    state,
    width: 100,
    height: 100,
    anchored: false,
  };
}

export { ElementView, buildFromElementState };
