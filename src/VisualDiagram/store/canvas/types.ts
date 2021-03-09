import { View } from '../../logic/View';
import { ActionShape } from '..';
import ElementView from 'src/VisualDiagram/logic/element/ElementView';
import LinkView from 'src/VisualDiagram/logic/link/LinkView';

export type CanvasViewRefeshAction = ActionShape<'canvas/view/refresh', View>;

export type CanvasElementRefeshAction = ActionShape<
'canvas/element/refresh',
ElementView
>;

export type CanvasLinkRefeshAction = ActionShape<
'canvas/link/refresh',
LinkView
>;

export type CanvasAction =
  | CanvasViewRefeshAction
  | CanvasElementRefeshAction
  | CanvasLinkRefeshAction;
