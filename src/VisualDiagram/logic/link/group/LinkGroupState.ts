import Point from '../../utils/Point';
import LinkState from '../LinkState';

type LinkGroupState = {
  id: string;
  name: string;
  color: string;
  points: Point[];
  fromElements: LinkState[];
  toElements: LinkState[];
};

export default LinkGroupState;
