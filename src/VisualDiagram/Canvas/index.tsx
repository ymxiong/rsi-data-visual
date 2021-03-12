import React, { useEffect } from 'react';

import Canvas from './components/Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshView, selectElement } from '../store/canvas/actions';
import { CustomComponents } from '..';
import { values } from 'lodash';
import { ToolbarDiv } from './components/Toolbar';

type CanvasContainerProps = {
  customComponents?: CustomComponents;
  // entities: EntityState;
  // customEntities: CustomEntities;
  // isConnecting: boolean;s
  // connectingLink: Links;
  // gridSize?: number;
  // artboard: { x: number; y: number; width: number; height: number };
  // zoomLevel: number;
  // configViewport: () => CanvasAction;
  // trackMovement: (coords: Coords) => CanvasAction;
  // anchorCanvas: (anchor: boolean) => CanvasAction;
  // zoom: (level: number) => CanvasAction;
  // undo: () => HistoryAction;
  // redo: () => HistoryAction;
  // unselectAll: () => MetaEntityAction;
  // anchorEntity: (isAnchored: boolean, id: string) => CanvasAction;
};

const CanvasContainer: React.FC<CanvasContainerProps> = () => {
  const dispatch = useDispatch();

  const view = useSelector((state: Store) => state.canvas.view);

  let canvasDOM: HTMLDivElement | undefined;

  const handleRef = (div: HTMLDivElement) => {
    canvasDOM = div;
    console.log(canvasDOM);
    // console.log('===============');
  };

  const handleResize = () => {
    if (canvasDOM) {
      // this.props.configViewport();
    }
  };

  const testMoveComponent = () => {
    const element = values(view.elements)[0];
    console.log('element', element);
    element.state.y += 100;
    dispatch(refreshView(view));
  };

  const handleKey = (ev: KeyboardEvent) => {
    if (ev.getModifierState('Meta') || ev.getModifierState('Control')) {
      switch (ev.key) {
        case 'z':
          ev.preventDefault();
          console.log('press z');
          // this.props.undo();
          break;
        case 'y':
          ev.preventDefault();
          console.log('press y');
          testMoveComponent();
          // this.props.redo();
          break;
        case 's':
          ev.preventDefault();
          console.log('press s');
          // this.props.redo();
          break;
        // no default
      }
    }
  };

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(selectElement('', false));
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(selectElement('', false));
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      handleRef={handleRef}
    />
  );
};

export default CanvasContainer;
