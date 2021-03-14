import React, { ComponentType, useEffect, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store';
import { refreshView, selectElement } from './store/canvas/actions';
import CanvasContainer from './Canvas';
import { ViewState, buildViewStateFromView } from './logic/ViewState';
import { buildViewFromViewState } from './logic/View';

export type VisualComponentStyles = {
  [type: string]: {
    style: ComponentType<any>;
  };
};

export type VisualDiagramProps = {
  componentStyles: VisualComponentStyles;
  onChange?: (viewState: ViewState) => void;
};

export type VisualDiagramHandle = {
  setView: (viewState: ViewState) => boolean;
};

const VisualDiagram: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
> = ({ componentStyles, onChange }: VisualDiagramProps, ref) => {
  const dispatch = useDispatch();

  const view = useSelector((state: Store) => {
    return state.canvas.view;
  });

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
        dispatch(refreshView(buildViewFromViewState(viewState)));
        // 这里返回布尔是想让外层能感知是否设置成功，上面这部份逻辑要做一下判断
        return true;
      },
    }),
    [dispatch],
  );

  return <CanvasContainer componentStyles={componentStyles} />;
};

export default React.memo(React.forwardRef(VisualDiagram));
