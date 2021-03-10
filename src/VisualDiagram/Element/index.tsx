import React, { ComponentType, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshElement, selectElement } from '../store/canvas/actions';
import { ViewModeProps } from 'demo/Task/ViewMode';
import { Element } from './components/Element';
import { ElementView } from '../logic/element/ElementView';

export type ElementContainerProps = {
  element: ElementView;
};

export const ElementHOC = (
  SubComponent: ComponentType<ViewModeProps>,
): React.FC<ElementContainerProps> => {
  const ElementContainer: React.FC<ElementContainerProps> = (props) => {
    const element = useSelector(
      (state: Store) => state.canvas.view.elements[props.element.id],
    );

    const dispatch = useDispatch();

    const MOVE_FREQUENCY = 2;

    const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      // 按下鼠标，选择元素
      dispatch(selectElement(element.id, true));
    };

    const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      // 松开鼠标，释放铆钉状态，依旧选择元素
      dispatch(refreshElement({ ...element, anchored: false }));
    };

    const onElementMove = (
      ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (element.anchored) {
        if (ev.buttons !== 1) {
          // 如果被铆钉但鼠标已松开，释放铆钉
          dispatch(refreshElement({ ...element, anchored: false }));
        } else {
          // 如果被铆钉，计算新的x，y值
          const refreshView = { ...element };
          refreshView.state.x = ev.clientX - element.width / 2;
          refreshView.state.y = ev.clientY - element.height / 2;
          dispatch(refreshElement(refreshView));
        }
      }
    };

    let moveEventTime = 0;

    const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      if (moveEventTime > MOVE_FREQUENCY) {
        onElementMove(ev);
      }
      moveEventTime += 1;
    };

    const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      ev.stopPropagation();
      onElementMove(ev);
    };

    return (
      <Element
        key={props.element.id}
        element={props.element}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <SubComponent {...props} />
      </Element>
    );
  };
  return ElementContainer;
};
