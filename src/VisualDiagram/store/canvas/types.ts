import { View } from '../../logic/view/View';
import { ActionShape } from '..';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';
import { Canvas } from '../../logic/canvas/Canvas';
import { Point } from '../../logic/utils/Point';
import { Size } from '../../logic/utils/Size';

export type CanvasRefreshAction = ActionShape<'canvas/refresh', Canvas>;

export type CanvasScaleRefreshAction = ActionShape<
  'canvas/scale/refresh',
  number
>;

export type CanvasAnchoredRefreshAction = ActionShape<
  'canvas/anchored/refresh',
  boolean
>;

export type CanvasOffsetRerfeshAction = ActionShape<
  'canvas/offset/refresh',
  Point
>;

export type CanvasOffsetForElementRefreshAction = ActionShape<
  'canvas/offset/for/element/refresh',
  string
>;

export type CanvasMarginRefreshAction = ActionShape<
  'canvas/margin/refresh',
  Point
>;

export type CanvasViewRefreshAction = ActionShape<'canvas/view/refresh', View>;

export type CanvasElementRefreshAction = ActionShape<
  'canvas/element/refresh',
  ElementView
>;

export type CanvasRefreshElementLocked = ActionShape<
  'canvas/element/locked/refresh',
  {
    elementId: string;
    locked: boolean;
  }
>;

export type CanvasElementAnchoredRefreshAction = ActionShape<
  'canvas/element/anchored/refresh',
  {
    elementId: string;
    anchored: boolean;
  }
>;
export type CanvasElementSizeRefreshAction = ActionShape<
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

export type CanvasLinkRefreshAction = ActionShape<
  'canvas/link/refresh',
  LinkView
>;

export type CanvasAction =
  | CanvasRefreshAction
  | CanvasScaleRefreshAction
  | CanvasAnchoredRefreshAction
  | CanvasOffsetRerfeshAction
  | CanvasOffsetForElementRefreshAction
  | CanvasMarginRefreshAction
  | CanvasViewRefreshAction
  | CanvasRefreshElementLocked
  | CanvasElementAnchoredRefreshAction
  | CanvasElementSizeRefreshAction
  | CanvasElementCreateAction
  | CanvasElementDeleteAction
  | CanvasElementRefreshAction
  | CanvasElementSelectAction
  | CanvasLinkRefreshAction;
