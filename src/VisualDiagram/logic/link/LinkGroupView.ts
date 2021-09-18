import { Point } from '../utils/Point';
import { LinkView } from './LinkView';

type LinkGroupView = {
  id: string;
  color?: string;
  points: Point[];
  links: LinkView[];
};

export { LinkGroupView };
