import { CanvasAction } from './types';
import { View } from '../../logic/view/View';
import { ElementView } from '../../logic/element/ElementView';
import { LinkView } from '../../logic/link/LinkView';
import { Canvas } from '../../logic/canvas/Canvas';
import { Point } from '../../logic/utils/Point';
import { Size } from '../../logic/utils/Size';

export const refreshCanvas = (canvas: Canvas): CanvasAction => ({
  type: 'canvas/refresh',
  payload: { ...canvas },
});

export const refreshCanvasScale = (scale: number): CanvasAction => ({
  type: 'canvas/scale/refresh',
  payload: scale,
});

export const refreshCanvasAnchored = (anchored: boolean): CanvasAction => ({
  type: 'canvas/anchored/refresh',
  payload: anchored,
});

export const refreshCanvasOffset = (offset: Point): CanvasAction => ({
  type: 'canvas/offset/refresh',
  payload: offset,
});

export const refreshCanvasOffsetForElement = (
  canvasId: string,
): CanvasAction => ({
  type: 'canvas/offset/for/element/refresh',
  payload: canvasId,
});

export const refreshCanvasMargin = (margin: Point): CanvasAction => ({
  type: 'canvas/margin/refresh',
  payload: margin,
});

export const refreshView = (view: View): CanvasAction => ({
  type: 'canvas/view/refresh',
  payload: view,
});

export const createElement = (element: ElementView): CanvasAction => ({
  type: 'canvas/element/create',
  payload: element,
});

export const deleteElement = (elementId: string): CanvasAction => ({
  type: 'canvas/element/delete',
  payload: elementId,
});

export const refreshElement = (element: ElementView): CanvasAction => ({
  type: 'canvas/element/refresh',
  payload: element,
});

export const refreshElementAnchored = (
  elementId: string,
  anchored: boolean,
): CanvasAction => ({
  type: 'canvas/element/anchored/refresh',
  payload: {
    elementId,
    anchored,
  },
});

export const refreshElementSize = (
  elementId: string,
  size: Size,
): CanvasAction => ({
  type: 'canvas/element/size/refresh',
  payload: {
    elementId,
    size,
  },
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
