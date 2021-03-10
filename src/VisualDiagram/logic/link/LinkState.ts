import Point from '../utils/Point';

type LinkState = {
  id: string;
  name: string;
  color: string;
  points: Point[];
  fromElementId: string;
  toElementId: string;
};

export default LinkState;
