import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store';
import { CanvasArtboard } from '../CanvasArtboard';
import CanvasViewport from '../CanvasViewport';
import { CanvasLinkSvgLand } from '../CanvasLinkSvgLand';
import { ElementContainer, ElementContainerProps } from '../../../Element';
import {
  buildFromElementState,
  ElementView,
} from '../../../logic/element/ElementView';
import { LinkView } from '../../../logic/link/LinkView';
import { keys, values } from 'lodash-es';
import { LinkContainer, LinkContainerProps } from '../../../Link';
import CanvasToolbar from '../CanvasToolbar';
import {
  refreshElement,
  refreshView,
  selectElement,
} from '../../../store/canvas/actions';
import { VisualDiagramComponents } from '../../../../VisualDiagram';

type CanvasProps = {
  components: VisualDiagramComponents;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  const dispatch = useDispatch();

  const view = useSelector((state: Store) => state.canvas.view);

  const onCreateElement = () => {
    const elementView: ElementView = buildFromElementState({
      id: 'test-new',
      name: '新增元素',
      color: '#2f3ffa',
      x: 100,
      y: 100,
      select: false,
    });
    view.elements[elementView.id] = elementView;
    dispatch(refreshView(view));
  };

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
              SubComponent: props.components.Task.elementStyle,
            };
            return <LinkContainer key={vProps.link.id} {...vProps} />;
          })}
        </CanvasLinkSvgLand>

        {values(view.elements).map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            element,
            SubComponent: props.components.Task.elementStyle,
          };
          return <ElementContainer key={vProps.element.id} {...vProps} />;
        })}

        <CanvasToolbar onCreateElement={onCreateElement} />
      </CanvasArtboard>
    </CanvasViewport>
  );
};

export default Canvas;
