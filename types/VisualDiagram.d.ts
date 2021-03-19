import React, { ComponentType } from 'react';
import { ViewState } from '../src/VisualDiagram/logic/view/ViewState';
import { ElementView } from '../src/VisualDiagram/logic/element/ElementView';

export type VisualComponentProps = {
  element: ElementView;
};

export type VisualElementComponents = {
  [type: string]: {
    component: ComponentType<any>;
  };
};

export type VisualToolbarProps = {
  id: string;
  icon: string;
  tips: string;
  onClick: () => void;
};

export type VisualToolbarState = { [id: string]: VisualToolbarProps };

export type VisualDiagramProps = {
  elementComponents: VisualElementComponents;
  toolbarState: VisualToolbarState;
  onChange?: (viewState: ViewState) => void;
};

export type VisualDiagramHandle = {
  setView: (viewState: ViewState) => boolean;
  getView: () => ViewState;
  selectToolbarItems: (items: string[]) => void;
};

export declare const VisualDiagram: React.ForwardRefExoticComponent<VisualDiagramProps>;
