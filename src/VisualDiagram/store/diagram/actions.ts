import { VisualToolbarProps } from '../../../../types';
import { DiagramAction } from './types';

export const refreshToolbarItem = (
  item: VisualToolbarProps,
): DiagramAction => ({
  type: 'diagram/toolbar/item/refresh',
  payload: item,
});

export const refreshToolbarItemBatch = (
  items: VisualToolbarProps[],
): DiagramAction => ({
  type: 'diagram/toolbar/item/batch/refresh',
  payload: items,
});

export const selectToolbarItems = (items: string[]): DiagramAction => ({
  type: 'diagram/toolbar/item/batch/select',
  payload: items,
});
