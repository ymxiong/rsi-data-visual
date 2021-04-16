import React from 'react';
import { CanvasToolbarItem } from './ToolbarItem';
import plusIcon from '../../../../assets/icons/plus.svg';
import linkIcon from '../../../../assets/icons/link.svg';
import uploadIcon from '../../../../assets/icons/upload.svg';
import zoomInIcon from '../../../../assets/icons/zoomIn.svg';
import zoomOutIcon from '../../../../assets/icons/zoomOut.svg';
import sortIcon from '../../../../assets/icons/sort.svg';
import cutIcon from '../../../../assets/icons/cut.svg';
import undoIcon from '../../../../assets/icons/undo.svg';
import redoIcon from '../../../../assets/icons/redo.svg';
import { VisualToolbarProps } from '../../../../../types';

const defaultIconMap: { [name: string]: string } = {
  plus: plusIcon,
  link: linkIcon,
  upload: uploadIcon,
  zoomIn: zoomInIcon,
  zoomOut: zoomOutIcon,
  sort: sortIcon,
  cut: cutIcon,
  undo: undoIcon,
  redo: redoIcon,
};

export const buildElementComponents = (
  toolbarItems: string[] = [],
  toolbarState: { [id: string]: VisualToolbarProps },
): JSX.Element[] => {
  const styles: JSX.Element[] = [];
  toolbarItems.forEach((toolbarItem: string) => {
    if (toolbarState[toolbarItem]) {
      let { icon } = toolbarState[toolbarItem];
      if (defaultIconMap[icon]) {
        icon = defaultIconMap[icon];
      }
      styles.push(
        <CanvasToolbarItem
          id={toolbarState[toolbarItem].id}
          key={toolbarState[toolbarItem].id}
          onClick={toolbarState[toolbarItem].onClick}
          tips={toolbarState[toolbarItem].tips}
          icon={icon}
        />,
      );
    }
  });
  return styles;
};
