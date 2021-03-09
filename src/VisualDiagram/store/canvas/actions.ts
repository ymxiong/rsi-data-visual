import { CanvasAction } from './types';
import { LogicView } from '../../../VisualLogic/LogicView';

export const refreshView = (view: LogicView): CanvasAction => ({
  type: 'canvas/view/refresh',
  payload: view,
});
