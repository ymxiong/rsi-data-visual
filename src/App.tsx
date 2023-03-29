import React, { useImperativeHandle, useRef } from 'react';
import { Provider } from 'react-redux';
import {
  ElementState,
  LinkState,
  VisualDiagramHandle,
  VisualDiagramProps,
  VisualToolbarConfig,
} from '../types';
import VisualDiagram from './VisualDiagram';
import { Point } from './VisualDiagram/logic/utils/Point';
import { ViewState } from './VisualDiagram/logic/view/ViewState';
import { configureStore } from './VisualDiagram/store';
import { visualCoreContext } from './VisualDiagram/store/context';

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
      getOffset: (): Point => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.getOffset();
        }
        return {
          x: 0,
          y: 0,
        };
      },
      createElement: (elementState: ElementState) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.createElement(elementState);
        }
        return false;
      },
      filterElement: (idList: string[]) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.filterElement(idList);
        }
        return false;
      },
      deleteElement: (elementId: string) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.deleteElement(elementId);
        }
        return false;
      },
      moveCanvasCenterToElement: (elementId: string) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.moveCanvasCenterToElement(elementId);
        }
        return false;
      },
      createLink: (linkState: LinkState) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.createLink(linkState);
        }
        return false;
      },
      deleteLink: (linkId: string) => {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.deleteLink(linkId);
        }
        return false;
      },
      refreshCanvasLocked: (canvasId: string, locked: boolean) => {
        if (visualDiagramRef.current) {
          visualDiagramRef.current.refreshCanvasLocked(canvasId, locked);
        }
      },
      refreshElementLocked: (elementId: string, locked: boolean) => {
        if (visualDiagramRef.current) {
          visualDiagramRef.current.refreshElementLocked(elementId, locked);
        }
      },
      selectToolbarItems: (items: string[]) => {
        if (visualDiagramRef.current) {
          visualDiagramRef.current.selectToolbarItems(items);
        }
      },
      refreshToolbarItems: (items: VisualToolbarConfig) => {
        if (visualDiagramRef.current) {
          visualDiagramRef.current.refreshToolbarItems(items);
        }
      },
      startLoading() {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.startLoading();
        }
        return false;
      },
      endLoading() {
        if (visualDiagramRef.current) {
          return visualDiagramRef.current.endLoading();
        }
        return false;
      },
    }),
    [],
  );

  return (
    <Provider store={storeRef.current} context={visualCoreContext}>
      <VisualDiagram {...props} ref={visualDiagramRef}></VisualDiagram>
    </Provider>
  );
};

export default React.memo(React.forwardRef(App));
