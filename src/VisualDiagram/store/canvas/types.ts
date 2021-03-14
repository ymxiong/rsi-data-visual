import { View } from '../../logic/view/View';
import { ActionShape } from '..';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';

export type CanvasViewRefeshAction = ActionShape<'canvas/view/refresh', View>;

export type CanvasElementRefeshAction = ActionShape<
  'canvas/element/refresh',
  ElementView
>;

export type CanvasElementSelectType = {
  elementId: string;
  selected: boolean;
};

export type CanvasElementSelectAction = ActionShape<
  'canvas/element/select',
  CanvasElementSelectType
>;

export type CanvasLinkRefeshAction = ActionShape<
  'canvas/link/refresh',
  LinkView
>;

export type CanvasAction =
  | CanvasViewRefeshAction
  | CanvasElementRefeshAction
  | CanvasElementSelectAction
  | CanvasLinkRefeshAction;
