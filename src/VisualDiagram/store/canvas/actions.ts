import { CanvasAction } from './types';
import { View } from '../../logic/view/View';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';

export const refreshView = (view: View): CanvasAction => ({
  type: 'canvas/view/refresh',
  payload: view,
});

export const refreshElement = (element: ElementView): CanvasAction => ({
  type: 'canvas/element/refresh',
  payload: element,
});

export const selectElement = (
  elementId: string,
  selected: boolean,
): CanvasAction => ({
  type: 'canvas/element/select',
  payload: {
    elementId,
    selected,
  },
});

export const refreshLink = (link: LinkView): CanvasAction => ({
  type: 'canvas/link/refresh',
  payload: link,
});
