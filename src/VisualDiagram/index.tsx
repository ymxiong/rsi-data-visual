import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store';
import {
  createElement,
  deleteElement,
  refreshCanvasLocked,
  refreshElementLocked,
  refreshView,
} from './store/canvas/actions';
import { selectToolbarItems } from './store/diagram/actions';
import CanvasContainer from './Canvas';
import { ViewState, buildViewStateFromView } from './logic/view/ViewState';
import { buildViewFromViewState } from './logic/view/View';
import {
  ElementState,
  VisualDiagramHandle,
  VisualDiagramProps,
} from '../../types';
import { buildFromElementState } from './logic/element/ElementView';

const VisualDiagram: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
> = ({ canvasConfig, onChange }: VisualDiagramProps, ref) => {
  const dispatch = useDispatch();

  const view = useSelector((state: Store) => state.canvas.view);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onChange) {
      const viewState: ViewState = buildViewStateFromView(view);

      // 处理一下 store 里面，使得发生修改时 view 的引用也发生变化
      // 目测从 view 转到 viewState 可能略微需要计算一些内容，可以在 onChange 这里添加一个节流
      onChange(viewState);
    }
  }, [onChange, view]);

  useImperativeHandle(
    ref,
    () => ({
      setView: (viewState: ViewState) => {
        dispatch(refreshView(buildViewFromViewState(viewState, canvasConfig)));
        // 这里返回布尔是想让外层能感知是否设置成功，上面这部份逻辑要做一下判断
        return true;
      },
      createElement: (elementState: ElementState) => {
        if (canvasConfig) {
          const { minSize } = canvasConfig.elementConfig.components[
            elementState.type
          ];
          dispatch(createElement(buildFromElementState(elementState, minSize)));
        } else {
          dispatch(createElement(buildFromElementState(elementState)));
        }
        return true;
      },
      refreshCanvasLocked: (canvasId: string, locked: boolean) => {
        dispatch(refreshCanvasLocked(locked));
      },
      refreshElementLocked: (elementId: string, locked: boolean) => {
        dispatch(refreshElementLocked(elementId, locked));
      },
      deleteElement: (elementId: string) => {
        dispatch(deleteElement(elementId));
        return true;
      },
      getView: (): ViewState => {
        return buildViewStateFromView(view);
      },
      selectToolbarItems(items: string[]) {
        dispatch(selectToolbarItems(items));
      },
      startLoading() {
        setLoading(true);
        return true;
      },
      endLoading() {
        setLoading(false);
        return true;
      },
    }),
    [dispatch, view, canvasConfig],
  );

  return <CanvasContainer canvasConfig={canvasConfig} loading={loading} />;
};

export default React.memo(React.forwardRef(VisualDiagram));
