import React, { ComponentType, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '../store/hooks';
import { Store } from '../store';
import {
  refreshElement,
  refreshElementAnchored,
  refreshElementSize,
  selectElement,
} from '../store/canvas/actions';
import { Element } from './components/Element';
import { ElementView } from '../logic/element/ElementView';
import { Point } from '../logic/utils/Point';
import { VisualElementProps } from '../../../types';
import { Pendant } from '../logic/utils/Pendant';
import { Size } from '../logic/utils/Size';

export type ElementContainerProps = {
  element: ElementView;
  viewOffset: Point;
  onElementMove: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: ElementView,
  ) => void;
  setToolbarHide: (hideToolbar: boolean) => void;
  minSize: Size;
  SubComponent: ComponentType<VisualElementProps>;
  pendant?: Pendant;
};

const ElementContainer: React.FC<ElementContainerProps> = (props) => {
  const dispatch = useDispatch();

  const element = useSelector(
    (state: Store) => state.canvas.view.elements[props.element.id],
  );

  const elementSize = useSelector(
    (state: Store) => state.canvas.view.elements[props.element.id].size,
  );

  const [elementDOM, setElementDOM] = useState<HTMLDivElement>();

  const onElementChange = useCallback(() => {
    // dispatch(refreshElement({ ...elementView }));
    setTimeout(() => {
      if (elementDOM) {
        const domRect = elementDOM.getBoundingClientRect();

        if (
          domRect.width !== elementSize.width
          || domRect.height !== elementSize.height
        ) {
          elementSize.width = domRect.width;
          elementSize.height = domRect.height;
          dispatch(refreshElementSize(element.id, elementSize));
        }
      }
    }, 50);
  }, [dispatch, element, elementDOM, elementSize]);

  const MOVE_FREQUENCY = 2;

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    // 按下鼠标，选择元素
    dispatch(selectElement(element.id, true));
    dispatch(
      refreshElement({
        ...element,
        mouseOffset: {
          x: ev.nativeEvent.offsetX,
          y: ev.nativeEvent.offsetY,
        },
      }),
    );
  };

  const onMouseUp = () => {
    // 松开鼠标，释放铆钉状态，依旧选择元素
    dispatch(refreshElementAnchored(element.id, false));
    props.setToolbarHide(false);
  };

  const onElementMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onElementMove(ev, props.element);
  };

  let moveEventTime = 0;

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (moveEventTime > MOVE_FREQUENCY) {
      onElementMove(ev);
    }
    moveEventTime += 1;
  };

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onElementMove(ev);
  };

  const handleRef = useCallback(
    (div: HTMLDivElement) => {
      if (div !== elementDOM) {
        setElementDOM(div);
      }
    },
    [elementDOM],
  );

  return (
    <Element
      key={element.id}
      element={element}
      offset={props.viewOffset}
      handleRef={handleRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <props.SubComponent {...props} onElementChange={onElementChange} />
    </Element>
  );
};

export default React.memo(ElementContainer);
