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

const buildFromElementState = (
  state: ElementState,
  size: Size = { ...defaultElementSize },
): ElementView => {
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
};

const refreshElementSlot = (element: ElementView): ElementView => {
  const FROM_LINK_TOTAL = element.bottomSlots.length;
  const TO_LINK_TOTAL = element.topSlots.length;

  const FROM_ELEMENT_PADDING_SINGLE = element.size.width / (FROM_LINK_TOTAL + 1);

  const TO_ELEMENT_PADDING_SINGLE = element.size.width / (TO_LINK_TOTAL + 1);

  for (let index = 0; index < element.bottomSlots.length; index += 1) {
    const slot = element.bottomSlots[index];
    const ELEMENT_POINT = {
      x: element.state.x,
      y: element.state.y,
    };
    const fromElementB: Point = {
      x: ELEMENT_POINT.x,
      y: ELEMENT_POINT.y + element.size.height,
    };
    slot.x = fromElementB.x + FROM_ELEMENT_PADDING_SINGLE * (index + 1);
    slot.y = fromElementB.y;
  }

  for (let index = 0; index < element.topSlots.length; index += 1) {
    const slot = element.topSlots[index];
    const ELEMENT_POINT = {
      x: element.state.x,
      y: element.state.y,
    };
    const toElementA: Point = {
      x: ELEMENT_POINT.x,
      y: ELEMENT_POINT.y,
    };
    slot.x = toElementA.x + TO_ELEMENT_PADDING_SINGLE * (index + 1);
    slot.y = toElementA.y;
  }
  return element;
};

export { ElementView, buildFromElementState, refreshElementSlot };
