import { ElementState } from '../element/ElementState';
import { LinkState } from '../link/LinkState';
import { View } from './View';
import { values } from 'lodash-es';

type ViewState = {
  id: string;
  elements: ElementState[];
  links: LinkState[];
};

const getViewStateTemplate = (): ViewState => {
  return {
    id: 'defaultView',
    elements: [],
    links: [],
  };
};

const buildViewStateFromView = (view: View): ViewState => {
  const viewState = {
    id: view.id,
    elements: values(view.elements).map((elementView) => elementView.state),
    links: values(view.links).map((LinkView) => LinkView.state),
  };
  return viewState;
};

export { ViewState, buildViewStateFromView, getViewStateTemplate };
