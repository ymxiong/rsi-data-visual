type SlotView = {
  linkId: string;
  x: number;
  y: number;
};

export const buildSlotView = (id: string): SlotView => {
  return {
    linkId: id,
    x: 0,
    y: 0,
  };
};

export { SlotView };
