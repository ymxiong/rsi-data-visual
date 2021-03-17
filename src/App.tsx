import React, { useImperativeHandle, useRef } from 'react';
import { Provider } from 'react-redux';
import { VisualDiagramHandle, VisualDiagramProps } from '../types';
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
