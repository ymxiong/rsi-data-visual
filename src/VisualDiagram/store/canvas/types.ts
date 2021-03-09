import { LogicView } from '../../../VisualLogic/LogicView/LogicView';
import { ActionShape } from '..';

export type CanvasViewRefeshAction = ActionShape<
'canvas/view/refresh',
LogicView
>;

export type CanvasAction = CanvasViewRefeshAction;
