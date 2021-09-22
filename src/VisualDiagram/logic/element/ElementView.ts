import { SlotView } from '../slot/SlotView';
import { Point } from '../utils/Point';
import { Size, defaultElementSize } from '../utils/Size';
import { ElementState } from './ElementState';

type ElementView = {
  id: string;
  state: ElementState;
  size: Size;
  mouseOffset: Point;
  anchored: boolean;
  topSlots: SlotView[];
  bottomSlots: SlotView[];
  slots: SlotView[];
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
    topSlots: [],
    bottomSlots: [],
    slots: [],
  };
}

export { ElementView, buildFromElementState };
