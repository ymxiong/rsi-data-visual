type ElementState = {
  id: string;
  name: string;
  type: string;
  color: string;
  x: number;
  y: number;
  select: boolean;
  data?: any;
  onDataChange?: (data: any) => void;
};

export { ElementState };
