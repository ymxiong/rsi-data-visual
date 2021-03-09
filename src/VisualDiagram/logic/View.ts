import ElementState from './element/ElementState';
import { buildFromElementState, ElementView } from './element/ElementView';
import LinkState from './link/LinkState';
import { buildFromLinkState, LinkView } from './link/LinkView';
import { viewStateTemplate } from './ViewState';

type View = {
  id: string;
  elements: {
    [id: string]: ElementView;
  };
  links: {
    [id: string]: LinkView;
  };
  selectedElementId?: string;
};

const viewTemplate = (): View => {
  const elements: { [id: string]: ElementView } = {};
  const links: { [id: string]: LinkView } = {};
  viewStateTemplate.elements.forEach((element: ElementState) => {
    elements[element.id] = buildFromElementState(element);
  });
  viewStateTemplate.links.forEach((link: LinkState) => {
    links[link.id] = buildFromLinkState(link);
  });
  return {
    id: '',
    elements,
    links,
  };
};

export { View, viewTemplate };
