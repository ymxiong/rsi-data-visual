import React, { ComponentType } from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from './store/canvas/actions';
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

const VisualDiagram = (props: VisualDiagramProps): JSX.Element => {
  const dispatch = useDispatch();

  dispatch(refreshView(buildViewFromViewState(props.viewState)));

  return <CanvasContainer componentStyles={props.componentStyles} />;
};

export default VisualDiagram;
