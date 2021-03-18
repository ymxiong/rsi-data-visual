import { VisualToolbarProps } from '../../../../types';
import { ActionShape } from '..';

export type DiagramRefreshToolbarItem = ActionShape<
  'diagram/toolbar/item/refresh',
  VisualToolbarProps
>;

export type DiagramRefreshToolbarItemBatch = ActionShape<
  'diagram/toolbar/item/batch/refresh',
  VisualToolbarProps[]
>;

export type DiagramToolbarItemBatchSelect = ActionShape<
  'diagram/toolbar/item/batch/select',
  string[]
>;

export type DiagramAction =
  | DiagramRefreshToolbarItem
  | DiagramRefreshToolbarItemBatch
  | DiagramToolbarItemBatchSelect;
