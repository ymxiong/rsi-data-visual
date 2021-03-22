import { Pendant } from '../utils/Pendant';

type ElementState = {
  id: string;
  name: string;
  type: string;
  color: string;
  x: number;
  y: number;
  select: boolean;
  locked: boolean;
  pendant?: Pendant;
};

export { ElementState };
