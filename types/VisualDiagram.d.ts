import React, { ComponentType } from 'react';
import { ViewState } from '../src/VisualDiagram/logic/view/ViewState';
import { ElementView } from '../src/VisualDiagram/logic/element/ElementView';
import { Size } from 'src/VisualDiagram/logic/utils/Size';

export type VisualComponentProps = {
  element: ElementView;
  onElementChange(element: ElementView): () => void;
};

export type VisualElementComponents = {
  [type: string]: {
    component: ComponentType<any>;
    defaultSize: Size;
  };
};

export type VisualToolbarProps = {
  id: string;
  icon: string;
  tips: string;
  onClick: () => void;
};

export type VisualToolbarConfig = { [id: string]: VisualToolbarProps };

export type VisualElementConfig = { components: VisualElementComponents };

export type VisualLinkConfig = { hasArrow: boolean; showName: boolean };

export type VisualCanvasConfig = {
  elementConfig: VisualElementConfig;
  linkConfig: VisualLinkConfig;
  toolbarConfig: VisualToolbarConfig;
};

export type VisualDiagramProps = {
  canvasConfig: VisualCanvasConfig;
  onChange?: (viewState: ViewState) => void;
};

export type VisualDiagramHandle = {
  setView: (viewState: ViewState) => boolean;
  getView: () => ViewState;
  selectToolbarItems: (items: string[]) => void;
};

export declare const VisualDiagram: React.ForwardRefExoticComponent<
  VisualDiagramProps & React.RefAttributes<VisualDiagramHandle>
>;
