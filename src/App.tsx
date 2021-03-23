import React, { useImperativeHandle, useRef } from 'react';
import { Provider } from 'react-redux';
import {
  ElementState,
  VisualDiagramHandle,
  VisualDiagramProps,
} from '../types';
import VisualDiagram from './VisualDiagram';
import { ViewState } from './VisualDiagram/logic/view/ViewState';
import { configureStore } from './VisualDiagram/store';

const App: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
> = (props, ref) => {
  const storeRef = useRef(configureStore());
  const visualDiagramRef = useRef<VisualDiagramHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      setView: (viewState: ViewState) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.setView(viewState);
        }
        return false;
      },
      getView: (): ViewState => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.getView();
        }
        return {
          id: '',
          elements: [],
          links: [],
        };
      },
      createElement: (elementState: ElementState) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.createElement(elementState);
        }
        return false;
      },
      deleteElement: (elementId: string) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.deleteElement(elementId);
        }
        return false;
      },
      selectToolbarItems: (items: string[]) => {
        if (visualDiagramRef.current) {
          visualDiagramRef.current.selectToolbarItems(items);
        }
      },
    }),
    [],
  );

  return (
    <Provider store={storeRef.current}>
      <VisualDiagram {...props} ref={visualDiagramRef}></VisualDiagram>
    </Provider>
  );
};

export default React.memo(React.forwardRef(App));
