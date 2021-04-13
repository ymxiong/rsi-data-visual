import { VisualToolbarProps } from '../../../../../types';

export const toolbarConfig = (
  onZoomIn: () => void,
  onZoomOut: () => void,
  onSort: () => void,
): VisualToolbarProps[] => {
  return [
    {
      id: 'zoomIn',
      onClick: onZoomIn,
      icon: 'zoomIn',
      tips: '放大',
    },
    {
      id: 'zoomOut',
      onClick: onZoomOut,
      icon: 'zoomOut',
      tips: '缩小',
    },
    {
      id: 'sort',
      onClick: onSort,
      icon: 'sort',
      tips: '整理',
    },
    {
      id: 'cut',
      onClick: onSort,
      icon: 'cut',
      tips: '裁剪',
    },
    {
      id: 'undo',
      onClick: onSort,
      icon: 'undo',
      tips: '撤销',
    },
    {
      id: 'redo',
      onClick: onSort,
      icon: 'redo',
      tips: '重做',
    },
  ];
};
