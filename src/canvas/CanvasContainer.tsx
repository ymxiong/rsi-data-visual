import React, { useEffect } from 'react';

import Canvas from './Canvas';
import { visualViewTemplate } from '../entity/VisualView';
import { CustomComponents } from 'src/diagram/Diagram';

type CanvasContainerProps = {
  customComponents: CustomComponents;
  // entities: EntityState;
  // customEntities: CustomEntities;
  // isConnecting: boolean;
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
  let canvasDOM: HTMLDivElement | undefined;

  const handleRef = (div: HTMLDivElement) => {
    canvasDOM = div;
    console.log(canvasDOM);
  };

  const handleResize = () => {
    if (canvasDOM) {
      // this.props.configViewport();
    }
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

  let moveFlag = false;

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('down');
    moveFlag = true;
  };

  const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (moveFlag) {
      console.log('up');
      moveFlag = false;
    }
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (moveFlag) {
      console.log('move', ev.clientX, ev.clientY);
    }
  };

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (moveFlag) {
      console.log('leave');
      moveFlag = false;
    }
    // this.props.anchorCanvas(true);
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
  });

  return (
    <Canvas
      visualView={visualViewTemplate()}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      handleRef={handleRef}
    />
  );
};

export default CanvasContainer;
