import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store';
import { CanvasArtboard, CanvasArtboardProps } from '../CanvasArtboard';
import CanvasViewport from '../CanvasViewport';
import { CanvasLinkSvgLand } from '../CanvasLinkSvgLand';
import { ElementContainer, ElementContainerProps } from '../../../Element';
import {
  buildFromElementState,
  ElementView,
} from '../../../logic/element/ElementView';
import { LinkView } from '../../../logic/link/LinkView';
import { values } from 'lodash-es';
import { LinkContainer, LinkContainerProps } from '../../../Link';
import CanvasToolbar from '../CanvasToolbar';
import { refreshCanvas, addElement } from '../../../store/canvas/actions';
import { VisualComponentStyles } from '../../../../../types';
import { newElementPoint } from '../../../logic/utils/Point';
import { zoomLevels } from '../../../logic/utils/Scale';
import {
  refreshToolbarItem,
  refreshToolbarItemBatch,
} from '../../../store/diagram/actions';

type CanvasProps = {
  componentStyles: VisualComponentStyles;
  onMouseDown: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  const dispatch = useDispatch();

  const canvas = useSelector((state: Store) => state.canvas.canvas);

  const view = useSelector((state: Store) => state.canvas.view);

  const onCreateElement = () => {
    const elementView: ElementView = buildFromElementState({
      id: 'test-new',
      name: '新增元素',
      type: 'model',
      color: '#2f3ffa',
      x: newElementPoint.x,
      y: newElementPoint.y,
      select: false,
    });
    dispatch(addElement(elementView));
  };

  const onZoomIn = () => {
    if (canvas.state.scale > zoomLevels.length - 2) {
      canvas.state.scale = zoomLevels.length - 1;
    } else {
      canvas.state.scale += 1;
    }
    dispatch(refreshCanvas({ ...canvas }));
  };

  const onZoomOut = () => {
    if (canvas.state.scale < 1) {
      canvas.state.scale = 0;
    } else {
      canvas.state.scale -= 1;
    }
    dispatch(refreshCanvas({ ...canvas }));
  };

  const onSort = () => {
    dispatch(refreshCanvas(canvas));
  };

  const canvasArtboardProps: CanvasArtboardProps = {
    offsetX: canvas.offset.x,
    offsetY: canvas.offset.y,
    scale: zoomLevels[canvas.state.scale],
    width: canvas.size.width,
    height: canvas.size.height,
  };

  useEffect(() => {
    dispatch(
      refreshToolbarItemBatch([
        {
          id: 'plus',
          onClick: onCreateElement,
          icon: 'plus',
          tips: '新增元素',
        },
        {
          id: 'zoomIn',
          onClick: onZoomIn,
          icon: 'zoomIn',
          tips: '放大',
        },
        {
          id: 'zoomOut',
          onClick: onZoomOut,
          icon: 'zoomOut',
          tips: '缩小',
        },
        {
          id: 'sort',
          onClick: onSort,
          icon: 'sort',
          tips: '整理',
        },
        {
          id: 'cut',
          onClick: onSort,
          icon: 'cut',
          tips: '裁剪',
        },
        {
          id: 'undo',
          onClick: onSort,
          icon: 'undo',
          tips: '撤销',
        },
        {
          id: 'redo',
          onClick: onSort,
          icon: 'redo',
          tips: '重做',
        },
      ]),
    );
  }, []);

  return (
    <CanvasViewport ref={(div: HTMLDivElement) => props.handleRef(div)}>
      <CanvasArtboard
        {...canvasArtboardProps}
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
              SubComponent: props.componentStyles.model.style,
            };
            return <LinkContainer key={vProps.link.id} {...vProps} />;
          })}
        </CanvasLinkSvgLand>

        {values(view.elements).map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            element,
            SubComponent: props.componentStyles[element.state.type].style,
          };
          return <ElementContainer key={vProps.element.id} {...vProps} />;
        })}
      </CanvasArtboard>

      <CanvasToolbar />
    </CanvasViewport>
  );
};

export default Canvas;
