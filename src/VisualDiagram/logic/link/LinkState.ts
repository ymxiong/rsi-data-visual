import { Pendant } from '../utils/Pendant';
import { Point } from '../utils/Point';

type LinkState = {
  id: string;
  name: string;
  type: string;
  color?: string;
  group?: string;
  points: Point[];
  fromElementId: string;
  toElementId: string;
  pendant?: Pendant;
};

export { LinkState };
