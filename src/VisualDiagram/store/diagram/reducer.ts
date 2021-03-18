import { Reducer } from 'redux';
import { VisualToolbarProps, VisualToolbarState } from '../../../../types';
import { DiagramAction } from './types';

export interface DiagramState {
  toolbar: VisualToolbarState;
  toolbarShowItems: string[];
}

const initialDiagramState: DiagramState = {
  toolbar: {},
  toolbarShowItems: ['plus', 'zoomIn', 'zoomOut'],
};

const diagramReducer: Reducer<DiagramState, DiagramAction> = (
  state = initialDiagramState,
  action,
) => {
  switch (action.type) {
    case 'diagram/toolbar/item/refresh': {
      const refreshState = { ...state };
      refreshState.toolbar[action.payload.id] = action.payload;
      return refreshState;
    }
    case 'diagram/toolbar/item/batch/refresh': {
      const refreshState = { ...state };
      refreshState.toolbar = { ...state.toolbar };
      action.payload.forEach((item: VisualToolbarProps) => {
        refreshState.toolbar[item.id] = item;
      });
      return refreshState;
    }
    case 'diagram/toolbar/item/batch/select': {
      const refreshState = { ...state };
      refreshState.toolbarShowItems = action.payload;
      return refreshState;
    }
    default: {
      return state;
    }
  }
};

export default diagramReducer;
