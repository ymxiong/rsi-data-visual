import { Point, standardOffset, zeroOffset } from '../utils/Point';
import { Size, standardSize } from '../utils/Size';
import { CanvasState } from './CanvasState';

type Canvas = {
  // canvasId用于控制多个canvas的处理
  id: string;
  // canvas的其他状态，可以被外部控制
  state: CanvasState;
  // canvas的移动铆钉状态，由内部控制
  anchored: boolean;
  // offset是canvas向左上角扩展的的差值（canvas逻辑差），用于计算画布相对初始值扩展了多少
  offset: Point;
  // 值等于offset，只在释放画布时刷新，用于提供给组件监听，解决画布移动性能问题
  offsetForComponent: Point;
  // margin是canvas相对左上角样式的的差值（canvas样式差），用于处理canvas与屏幕的相对位置
  margin: Point;
  // viewport是canvas外层显示的大小
  viewport: Size;
  // size是canvas自己实际的大小
  size: Size;
};

const canvasStateTemplate: CanvasState = {
  id: 'defaultCanvasState',
  scale: 3,
  locked: false,
};

const buildCanvasFromCanvasState = (
  state: CanvasState = { ...canvasStateTemplate },
): Canvas => {
  const canvas = {
    id: state.id,
    state,
    anchored: false,
    offset: {
      ...standardOffset,
    },
    offsetForComponent: {
      ...standardOffset,
    },
    margin: {
      ...zeroOffset,
    },
    viewport: { ...standardSize },
    size: {
      width: standardSize.width - 2 * standardOffset.x,
      height: standardSize.height - 2 * standardOffset.y,
    },
  };
  return canvas;
};

export { Canvas, buildCanvasFromCanvasState };
