import ElementState from '../element/ElementState';
import { buildFromElementState, ElementView } from '../element/ElementView';
import LinkState from '../link/LinkState';
import { buildFromLinkState, LinkView } from '../link/LinkView';
import { ViewState } from './ViewState';

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

const viewStateTemplate: ViewState = {
  id: 'testView',
  elements: [
    {
      id: 'testElement',
      name: 'testElement',
      type: 'model',
      color: '#ff7875',
      x: 100,
      y: 100,
      select: false,
    },
  ],
  links: [],
};

const buildViewFromViewState = (
  viewState: ViewState = { ...viewStateTemplate },
): View => {
  const elements: { [id: string]: ElementView } = {};
  const links: { [id: string]: LinkView } = {};
  viewState.elements.forEach((element: ElementState) => {
    elements[element.id] = buildFromElementState(element);
  });
  viewState.links.forEach((link: LinkState) => {
    links[link.id] = buildFromLinkState(link);
    elements[link.fromElementId].linkSourceIds.push(link.id);
    elements[link.toElementId].linkTargetIds.push(link.id);
  });
  return {
    id: '',
    elements,
    links,
  };
};

export { View, buildViewFromViewState };
