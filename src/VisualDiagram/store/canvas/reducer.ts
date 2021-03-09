import { Reducer } from 'redux';
import {
  LogicView,
  logicViewTemplate,
} from '../../../VisualLogic/LogicView/LogicView';
import { CanvasAction } from './types';

export interface CanvasState {
  view: LogicView;
}

const initialCanvasState: CanvasState = {
  view: logicViewTemplate(),
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
    default: {
      return state;
    }
  }
};

export default canvasReducer;
