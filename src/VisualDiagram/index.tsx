import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from './store/hooks';
import { Store } from './store';
import {
  createElement,
  createLink,
  deleteElement,
  deleteLink,
  filterElement,
  refreshCanvasLocked,
  refreshCanvasOffset,
  refreshElementLocked,
  refreshView,
} from './store/canvas/actions';
import {
  refreshToolbarItemBatch,
  selectToolbarItems,
} from './store/diagram/actions';
import CanvasContainer from './Canvas';
import { ViewState, buildViewStateFromView } from './logic/view/ViewState';
import { buildViewFromViewState } from './logic/view/View';
import {
  ElementState,
  LinkState,
  VisualDiagramHandle,
  VisualDiagramProps,
  VisualToolbarConfig,
} from '../../types';
import { buildFromElementState } from './logic/element/ElementView';
import { buildFromLinkState } from './logic/link/LinkView';
import { Point } from './logic/utils/Point';

const VisualDiagram: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
> = ({ canvasConfig, onChange }: VisualDiagramProps, ref) => {
  const dispatch = useDispatch();

  const view = useSelector((state: Store) => state.canvas.view);

  const offset = useSelector((state: Store) => state.canvas.canvas.offset);

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
        dispatch(
          refreshView(buildViewFromViewState(viewState, view, canvasConfig)),
        );
        // 这里返回布尔是想让外层能感知是否设置成功，上面这部份逻辑要做一下判断
        return true;
      },
      getView: (): ViewState => {
        return buildViewStateFromView(view);
      },
      getOffset: (): Point => {
        return {
          x: view.offset.x - offset.x,
          y: view.offset.y - offset.y,
        };
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
      filterElement: (idList: string[]) => {
        dispatch(filterElement(idList));
        return true;
      },
      deleteElement: (elementId: string) => {
        dispatch(deleteElement(elementId));
        return true;
      },
      moveCanvasCenterToElement: (elementId: string) => {
        const x = 500 - view.elements[elementId].state.x + view.offset.x;
        const y = 250 - view.elements[elementId].state.y + view.offset.y;
        dispatch(refreshCanvasOffset({ x, y }));
        return true;
      },
      createLink: (linkState: LinkState) => {
        dispatch(createLink(buildFromLinkState(linkState)));
        return true;
      },
      deleteLink: (linkId: string) => {
        dispatch(deleteLink(linkId));
        return true;
      },
      refreshCanvasLocked: (canvasId: string, locked: boolean) => {
        dispatch(refreshCanvasLocked(locked));
      },
      refreshElementLocked: (elementId: string, locked: boolean) => {
        dispatch(refreshElementLocked(elementId, locked));
      },
      selectToolbarItems(items: string[]) {
        dispatch(selectToolbarItems(items));
      },
      refreshToolbarItems: (items: VisualToolbarConfig) => {
        dispatch(refreshToolbarItemBatch(items));
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
    [dispatch, view, canvasConfig, offset],
  );

  return <CanvasContainer canvasConfig={canvasConfig} loading={loading} />;
};

export default React.memo(React.forwardRef(VisualDiagram));
