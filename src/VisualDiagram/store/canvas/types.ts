import { View } from '../../logic/view/View';
import { ActionShape } from '..';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';
import { Canvas } from '../../logic/canvas/Canvas';
import { Point } from '../../logic/utils/Point';
import { Size } from '../../logic/utils/Size';

export type CanvasRefeshAction = ActionShape<'canvas/refresh', Canvas>;

export type CanvasScaleRefeshAction = ActionShape<
  'canvas/scale/refresh',
  number
>;

export type CanvasAnchoredRefeshAction = ActionShape<
  'canvas/anchored/refresh',
  boolean
>;

export type CanvasOffsetRefeshAction = ActionShape<
  'canvas/offset/refresh',
  Point
>;

export type CanvasMarginRefeshAction = ActionShape<
  'canvas/margin/refresh',
  Point
>;

export type CanvasViewRefeshAction = ActionShape<'canvas/view/refresh', View>;

export type CanvasElementRefeshAction = ActionShape<
  'canvas/element/refresh',
  ElementView
>;

export type CanvasElementAnchoredRefeshAction = ActionShape<
  'canvas/element/anchored/refresh',
  {
    elementId: string;
    anchored: boolean;
  }
>;
export type CanvasElementSizeRefeshAction = ActionShape<
  'canvas/element/size/refresh',
  {
    elementId: string;
    size: Size;
  }
>;

export type CanvasElementCreateAction = ActionShape<
  'canvas/element/create',
  ElementView
>;

export type CanvasElementDeleteAction = ActionShape<
  'canvas/element/delete',
  string
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
  | CanvasScaleRefeshAction
  | CanvasAnchoredRefeshAction
  | CanvasOffsetRefeshAction
  | CanvasMarginRefeshAction
  | CanvasViewRefeshAction
  | CanvasElementAnchoredRefeshAction
  | CanvasElementSizeRefeshAction
  | CanvasElementCreateAction
  | CanvasElementDeleteAction
  | CanvasElementRefeshAction
  | CanvasElementSelectAction
  | CanvasLinkRefeshAction;
