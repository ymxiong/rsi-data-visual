import React, { ComponentType } from 'react';
import { ViewState } from '../src/VisualDiagram/logic/view/ViewState';
import { ElementView } from '../src/VisualDiagram/logic/element/ElementView';
import { Size } from '../src/VisualDiagram/logic/utils/Size';
import { ElementState } from '../src/VisualDiagram/logic/element/ElementState';
import { Pendant } from '../src/VisualDiagram/logic/utils/Pendant';
import { LinkView } from '../src/VisualDiagram/logic/link/LinkView';

export type VisualElementProps = {
  element: ElementView;
  onElementChange: (element: ElementView) => void;
  pendant?: Pendant;
};

export type VisualElementComponents = {
  [type: string]: {
    component: ComponentType<VisualElementProps>;
    minSize: Size;
  };
};

export type VisualLinkProps = {
  link: LinkView;
  onLinkChange: (link: LinkView) => void;
  pendant?: Pendant;
};

export type VisualLinkComponents = {
  [type: string]: {
    component?: ComponentType<VisualLinkProps>;
    hasArrow: boolean;
    showName: boolean;
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

export type VisualLinkConfig = {
  components: VisualLinkComponents;
};

export type VisualGlobalConfig = {
  gridSize?: number;
};

export type VisualCanvasConfig = {
  elementConfig: VisualElementConfig;
  linkConfig: VisualLinkConfig;
  toolbarConfig: VisualToolbarConfig;
  globalConfig: VisualGlobalConfig;
};

export type VisualDiagramProps = {
  canvasConfig: VisualCanvasConfig;
  onChange?: (viewState: ViewState) => void;
};

export type VisualDiagramHandle = {
  setView: (viewState: ViewState) => boolean;
  getView: () => ViewState;
  createElement: (elementState: ElementState) => boolean;
  deleteElement: (elementId: string) => boolean;
  selectToolbarItems: (items: string[]) => void;
  startLoading: () => boolean;
  endLoading: () => boolean;
};

export declare const VisualDiagram: React.ForwardRefExoticComponent<
  VisualDiagramProps & React.RefAttributes<VisualDiagramHandle>
>;
