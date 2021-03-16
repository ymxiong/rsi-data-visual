import { View } from '../../logic/view/View';
import { ActionShape } from '..';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';
import { Canvas } from '../../logic/canvas/Canvas';

export type CanvasRefeshAction = ActionShape<'canvas/refresh', Canvas>;

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
  | CanvasRefeshAction
  | CanvasViewRefeshAction
  | CanvasElementRefeshAction
  | CanvasElementSelectAction
  | CanvasLinkRefeshAction;
