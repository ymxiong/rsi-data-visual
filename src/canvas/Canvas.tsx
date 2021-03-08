import React, { ComponentType } from 'react';
import { CanvasArtboard } from './CanvasArtboard';
import CanvasViewport from './CanvasViewport';
import { SvgLand } from './SvgLand';
import { VisualView } from '../entity/VisualView';
import {
  ComponentHOC,
  ComponentViewContainerProps,
} from '../container/ComponentContainer';
import Component from '../../src/entity/Component';
import ViewMode from '../../demo/Task/ViewMode';

type CanvasProps = {
  visualView: VisualView;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  return (
    <CanvasViewport ref={(div: HTMLDivElement) => props.handleRef(div)}>
      <CanvasArtboard
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onMouseMove={props.onMouseMove}
        onMouseLeave={props.onMouseLeave}
      >
        {/* link drawer */}
        <SvgLand width="100%" height="100%">
          {/* {props.visualView.components.map((combo: any) => {
            return <ComponentType key={Combo.entity.id} model={Combo.entity} />;
          })} */}
        </SvgLand>
        {props.visualView.components.map((component: Component) => {
          const vProps: ComponentViewContainerProps = {
            id: component.id,
            component,
          };
          return ComponentHOC(ViewMode)(vProps);
        })}
      </CanvasArtboard>
    </CanvasViewport>
  );
};

export default Canvas;
