import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store';
import { CanvasArtboard } from '../CanvasArtboard';
import CanvasViewport from '../CanvasViewport';
import { CanvasLinkSvgLand } from '../CanvasLinkSvgLand';
import { ElementHOC, ElementContainerProps } from '../../../Element';
import ViewMode from '../../../../../demo/Task/ViewMode';
import { ElementView } from '../../../logic/element/ElementView';
import { LinkView } from '../../../logic/link/LinkView';
import { keys, values } from 'lodash';
import { LinkContainerProps, LinkHOC } from '../../../Link';
import CanvasToolbar from '../CanvasToolbar';

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
        <CanvasLinkSvgLand width="100%" height="100%">
          {values(view.links).map((link: LinkView) => {
            const vProps: LinkContainerProps = {
              link,
            };
            return LinkHOC(ViewMode)(vProps);
          })}
        </CanvasLinkSvgLand>

        {values(view.elements).map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            element,
          };
          return ElementHOC(ViewMode)(vProps);
        })}

        <CanvasToolbar
          onMouseDown={props.onMouseDown}
          onMouseUp={props.onMouseUp}
          onMouseMove={props.onMouseMove}
          onMouseLeave={props.onMouseLeave}
        />
      </CanvasArtboard>
    </CanvasViewport>
  );
};

export default Canvas;
