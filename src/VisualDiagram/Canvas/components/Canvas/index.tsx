import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store';
import { CanvasArtboard } from '../CanvasArtboard';
import CanvasViewport from '../CanvasViewport';
import { SvgLand } from '../SvgLand';
import { ElementHOC, ElementContainerProps } from '../../../Element';
import ViewMode from '../../../../../demo/Task/ViewMode';
import ElementView from '../../../logic/element/ElementView';

type CanvasProps = {
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  const view = useSelector((state: Store) => state.canvas.view);

  return (
    <CanvasViewport ref={(div: HTMLDivElement) => props.handleRef(div)}>
      <CanvasArtboard
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onMouseMove={props.onMouseMove}
        onMouseLeave={props.onMouseLeave}
      >
        {/* link drawer */}
        <SvgLand width="100%" height="100%"></SvgLand>
        {view.elements.map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            id: element.id,
            element,
          };
          return ElementHOC(ViewMode)(vProps);
        })}
      </CanvasArtboard>
    </CanvasViewport>
  );
};

export default Canvas;
