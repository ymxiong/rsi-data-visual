import ElementState from './element/ElementState';
import LinkState from './link/LinkState';

type ViewState = {
  id: string;
  elements: ElementState[];
  links: LinkState[];
};

export { ViewState };
