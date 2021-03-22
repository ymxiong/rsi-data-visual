import { VisualCanvasConfig } from '../../../../types';
import ElementState from '../element/ElementState';
import { buildFromElementState, ElementView } from '../element/ElementView';
import LinkState from '../link/LinkState';
import { buildFromLinkState, LinkView } from '../link/LinkView';
import { Point, standardOffset, newElementPoint } from '../utils/Point';
import { ViewState } from './ViewState';

type View = {
  id: string;
  elements: {
    [id: string]: ElementView;
  };
  links: {
    [id: string]: LinkView;
  };
  offset: Point;
  selectedElementId?: string;
};

const viewStateTemplate: ViewState = {
  id: 'defaultView',
  elements: [
    {
      id: 'defaultElement',
      name: '新建组件',
      // TODO: 处理element type问题
      type: 'model',
      color: '#ff4d4f',
      x: newElementPoint.x,
      y: newElementPoint.y,
      select: false,
    },
  ],
  links: [],
};

const buildViewFromViewState = (
  viewState: ViewState = { ...viewStateTemplate },
  canvasConfig: VisualCanvasConfig | undefined = undefined,
): View => {
  const elements: { [id: string]: ElementView } = {};
  const links: { [id: string]: LinkView } = {};
  viewState.elements.forEach((element: ElementState) => {
    if (canvasConfig) {
      const { defaultSize } = canvasConfig.elementConfig.components[
        element.type
      ];
      elements[element.id] = buildFromElementState(element, defaultSize);
    } else {
      elements[element.id] = buildFromElementState(element);
    }
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
    offset: {
      ...standardOffset,
      // ...zeroOffset,
    },
  };
};

export { View, buildViewFromViewState };
