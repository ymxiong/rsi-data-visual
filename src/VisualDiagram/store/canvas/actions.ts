import { CanvasAction } from './types';
import { View } from '../../logic/View';
import ElementView from 'src/VisualDiagram/logic/element/ElementView';
import LinkView from 'src/VisualDiagram/logic/link/LinkView';

export const refreshView = (view: View): CanvasAction => ({
  type: 'canvas/view/refresh',
  payload: view,
});

export const refreshElement = (element: ElementView): CanvasAction => ({
  type: 'canvas/element/refresh',
  payload: element,
});

export const refreshLink = (link: LinkView): CanvasAction => ({
  type: 'canvas/link/refresh',
  payload: link,
});
