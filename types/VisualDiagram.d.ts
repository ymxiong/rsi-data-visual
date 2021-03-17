import React, { ComponentType } from 'react';
import { ViewState } from '../src/VisualDiagram/logic/view/ViewState';
import { ElementView } from '../src/VisualDiagram/logic/element/ElementView';

export type VisualComponentProps = {
  element: ElementView;
};

export type VisualComponentStyles = {
  [type: string]: {
    style: ComponentType<VisualComponentProps>;
  };
};

export type VisualDiagramProps = {
  componentStyles: VisualComponentStyles;
  onChange?: (viewState: ViewState) => void;
};

export type VisualDiagramHandle = {
  setView: (viewState: ViewState) => boolean;
};

export declare const VisualDiagram: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
>;
