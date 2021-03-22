type PendantData = {
  type: string;
  detail: any;
};

type Pendant = {
  data: PendantData;
  onDataChange: (data: PendantData) => void;
};

export { Pendant, PendantData };
