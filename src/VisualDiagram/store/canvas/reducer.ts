import { Reducer } from 'redux';
import { Canvas, buildCanvasFromCanvasState } from '../../logic/canvas/Canvas';
import { View, buildViewFromViewState } from '../../logic/view/View';
import { CanvasAction } from './types';

export interface CanvasState {
  canvas: Canvas;
  view: View;
}

const initialCanvasState: CanvasState = {
  canvas: buildCanvasFromCanvasState(),
  view: buildViewFromViewState(),
};

const canvasReducer: Reducer<CanvasState, CanvasAction> = (
  state = initialCanvasState,
  action,
) => {
  switch (action.type) {
    case 'canvas/refresh': {
      return {
        ...state,
        canvas: { ...action.payload },
      };
    }
    case 'canvas/view/refresh': {
      return {
        ...state,
        view: { ...action.payload },
      };
    }
    case 'canvas/element/refresh': {
      const refreshState = { ...state };
      refreshState.view.elements[action.payload.id] = action.payload;
      return refreshState;
    }
    case 'canvas/element/select': {
      const refreshState = { ...state };

      // 如果选择状态是个true，同时铆钉元素
      if (action.payload.selected) {
        refreshState.view.selectedElementId = action.payload.elementId;
        refreshState.view.elements[action.payload.elementId].anchored = true;
        return refreshState;
      }
      // 如果选择状态是个false，同时清除铆钉元素，这样就解决了鼠标速度过快离开绘制区域时，阻止元素跟跑的问题
      if (refreshState.view.selectedElementId) {
        refreshState.view.elements[
          refreshState.view.selectedElementId
        ].anchored = false;
        refreshState.view.selectedElementId = undefined;
      }
      return refreshState;
    }
    case 'canvas/link/refresh': {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default canvasReducer;
