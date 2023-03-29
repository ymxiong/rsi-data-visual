import { randomString } from '../utils/RandomUtils';
import { VisualCanvasConfig } from '../../../../types';
import { ElementState } from '../element/ElementState';
import {
  buildFromElementState,
  ElementView,
  refreshElementSlot,
} from '../element/ElementView';
import { LinkGroupView } from '../link/LinkGroupView';
import { LinkState } from '../link/LinkState';
import { buildFromLinkState, LinkView } from '../link/LinkView';
import { Point, standardOffset } from '../utils/Point';
import { getViewStateTemplate, ViewState } from './ViewState';
import { buildSlotView } from '../slot/SlotView';
import { values } from 'lodash-es';

type View = {
  id: string;
  elements: {
    [id: string]: ElementView;
  };
  links: {
    [id: string]: LinkView;
  };
  linkGroups: {
    [id: string]: LinkGroupView;
  };
  offset: Point;
  selectedElementId?: string;
  filterElementIdList: string[];
};

const getViewTemplate = (): View => {
  return {
    id: 'defaultView',
    elements: {},
    links: {},
    linkGroups: {},
    offset: {
      ...standardOffset,
      // ...zeroOffset,
    },
    filterElementIdList: [],
  };
};

const buildViewFromViewState = (
  viewState: ViewState = getViewStateTemplate(),
  view: View = getViewTemplate(),
  canvasConfig: VisualCanvasConfig | undefined = undefined,
): View => {
  const elements: { [id: string]: ElementView } = {};
  const links: { [id: string]: LinkView } = {};
  viewState.elements.forEach((element: ElementState) => {
    const size = view.elements[element.id]?.size;
    if (canvasConfig) {
      const { minSize } = canvasConfig.elementConfig.components[element.type];
      elements[element.id] = buildFromElementState(element, size || minSize);
    } else {
      elements[element.id] = buildFromElementState(element, size);
    }
  });
  const linkGroups: { [id: string]: LinkGroupView } = {};

  viewState.links.forEach((link: LinkState) => {
    const slotFrom = buildSlotView(link.id);
    const slotTo = buildSlotView(link.id);

    elements[link.fromElementId].bottomSlots.push(slotFrom);
    elements[link.toElementId].topSlots.push(slotTo);

    const linkView: LinkView = buildFromLinkState(link);
    linkView.slotFrom = slotFrom;
    linkView.slotTo = slotTo;

    if (link.group) {
      if (!linkGroups[link.group]) {
        linkGroups[link.group] = {
          id: randomString(6),
          color: link.color,
          points: [],
          links: [],
        };
        linkGroups[link.group].links.push(linkView);
      }
    } else {
      links[link.id] = linkView;
    }
  });

  values(elements).forEach((element) => {
    refreshElementSlot(element);
  });

  return {
    id: viewState.id,
    elements,
    links,
    linkGroups,
    offset: {
      ...view.offset,
    },
    filterElementIdList: [],
  };
};

export { View, buildViewFromViewState, getViewTemplate };
