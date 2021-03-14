import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store';
import { refreshView, selectElement } from './store/canvas/actions';
import CanvasContainer from './Canvas';
import { ViewState } from './logic/ViewState';
import { buildViewFromViewState } from './logic/View';

export type VisualComponentStyles = {
  [type: string]: {
    style: ComponentType<any>;
  };
};

export type VisualDiagramProps = {
  componentStyles: VisualComponentStyles;
  viewState: ViewState;
};

const VisualDiagram = (props: VisualDiagramProps) => {
  const dispatch = useDispatch();

  dispatch(refreshView(buildViewFromViewState(props.viewState)));

  return <CanvasContainer componentStyles={props.componentStyles} />;
};

export default VisualDiagram;
