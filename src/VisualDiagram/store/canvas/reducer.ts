import { Reducer } from 'redux';
import ElementView from 'src/VisualDiagram/logic/element/ElementView';
import { View, viewTemplate } from '../../logic/View';
import { CanvasAction } from './types';

export interface CanvasState {
  view: View;
}

const initialCanvasState: CanvasState = {
  view: viewTemplate(),
};

const canvasReducer: Reducer<CanvasState, CanvasAction> = (
  state = initialCanvasState,
  action,
) => {
  switch (action.type) {
    case 'canvas/view/refresh': {
      return {
        ...state,
        view: { ...action.payload },
      };
    }
    case 'canvas/element/refresh': {
      const elements: ElementView[] = state.view.elements.map(
        (element: ElementView): ElementView => {
          if (element.id === action.payload.id) {
            return {
              ...element,
              ...action.payload,
            };
          }
          return element;
        },
      );
      return {
        ...state,
        view: {
          ...state.view,
          elements,
        },
      };
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
