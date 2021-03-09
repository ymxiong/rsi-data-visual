import { Reducer } from 'redux';
import { DiagramAction } from './types';

export interface DiagramState {
  id: string;
}

const initialDiagramState: DiagramState = {
  id: '',
};

const diagramReducer: Reducer<DiagramState, DiagramAction> = (
  state = initialDiagramState,
  action,
) => {
  switch (action.type) {
    case 'test/test': {
      return {
        ...state,
        id: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default diagramReducer;
