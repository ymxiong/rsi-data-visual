import React, { useCallback, useEffect, useState } from 'react';
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
import {
  refreshCanvas,
  addElement,
  refreshElement,
  selectElement,
} from '../../../store/canvas/actions';
import { VisualElementConfig, VisualLinkConfig } from '../../../../../types';
import { newElementPoint, Point } from '../../../logic/utils/Point';
import { zoomLevels } from '../../../logic/utils/Scale';
import { refreshToolbarItemBatch } from '../../../store/diagram/actions';

type CanvasProps = {
  elementConfig: VisualElementConfig;
  linkConfig: VisualLinkConfig;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  const dispatch = useDispatch();

  const canvas = useSelector((state: Store) => state.canvas.canvas);

  const view = useSelector((state: Store) => state.canvas.view);

  const [hideToolbar, setToolbarHide] = useState(false);

  const onCreateElement = useCallback(() => {
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
  }, [dispatch]);

  const onZoomIn = useCallback(() => {
    if (canvas.state.scale > zoomLevels.length - 2) {
      canvas.state.scale = zoomLevels.length - 1;
    } else {
      canvas.state.scale += 1;
    }
    dispatch(refreshCanvas({ ...canvas }));
  }, [canvas, dispatch]);

  const onZoomOut = useCallback(() => {
    if (canvas.state.scale < 1) {
      canvas.state.scale = 0;
    } else {
      canvas.state.scale -= 1;
    }
    dispatch(refreshCanvas({ ...canvas }));
  }, [canvas, dispatch]);

  const onSort = useCallback(() => {
    dispatch(refreshCanvas(canvas));
  }, [canvas, dispatch]);

  const canvasArtboardProps: CanvasArtboardProps = {
    offsetX: canvas.offset.x,
    offsetY: canvas.offset.y,
    scale: zoomLevels[canvas.state.scale],
    width: canvas.size.width,
    height: canvas.size.height,
  };

  const handleKey = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.getModifierState('Meta') || ev.getModifierState('Control')) {
        switch (ev.key) {
          case 'z':
            ev.preventDefault();
            break;
          case 'y':
            ev.preventDefault();
            break;
          case 's':
            ev.preventDefault();
            break;
          case 'i':
            ev.preventDefault();
            onZoomIn();
            break;
          case 'o':
            ev.preventDefault();
            onZoomOut();
            break;
          // no default
        }
      }
    },
    [onZoomIn, onZoomOut],
  );

  const onCanvasMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvas.anchored) {
      setToolbarHide(false);
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshCanvas({ ...canvas, anchored: false }));
      } else {
        // 如果被铆钉，计算新的x，y值
        const newCanvas = { ...canvas };
        newCanvas.offset.x
          += ev.movementX * zoomLevels[zoomLevels.length - 1 - canvas.state.scale];
        newCanvas.offset.y
          += ev.movementY * zoomLevels[zoomLevels.length - 1 - canvas.state.scale];
        dispatch(refreshCanvas(newCanvas));
      }
    }

    // 滑出画布的监听问题
    if (
      view.selectedElementId
      && view.elements[view.selectedElementId].anchored
    ) {
      setToolbarHide(true);
      const anchoredElement = view.elements[view.selectedElementId];
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshElement({ ...anchoredElement, anchored: false }));
      } else {
        // 如果被铆钉，计算新的x，y值
        const refreshViewElement = { ...anchoredElement };
        const point: Point = {
          x:
            (ev.pageX - canvas.margin.x) / zoomLevels[canvas.state.scale]
            - canvas.offset.x
            + view.offset.x
            - anchoredElement.width / 2,
          y:
            (ev.pageY - canvas.margin.y) / zoomLevels[canvas.state.scale]
            - canvas.offset.y
            + view.offset.y
            - anchoredElement.height / 2,
        };
        refreshViewElement.state.x = point.x;
        refreshViewElement.state.y = point.y;
        dispatch(refreshElement(refreshViewElement));
      }
    }
  };

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(refreshCanvas({ ...canvas, anchored: true }));
  };

  const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvas({ ...canvas, anchored: false }));
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCanvasMove(ev);
  };

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvas({ ...canvas, anchored: false }));
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.document.addEventListener('keydown', handleKey);

    return () => {
      window.document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

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
  }, [dispatch, onCreateElement, onSort, onZoomIn, onZoomOut]);

  return (
    <CanvasViewport ref={(div: HTMLDivElement) => props.handleRef(div)}>
      <CanvasArtboard
        {...canvasArtboardProps}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* link drawer */}
        <CanvasLinkSvgLand width="100%" height="100%">
          {values(view.links).map((link: LinkView) => {
            const vProps: LinkContainerProps = {
              view,
              link,
              linkConfig: props.linkConfig,
              SubComponent: props.elementConfig.components.model.component,
            };
            return <LinkContainer key={vProps.link.id} {...vProps} />;
          })}
        </CanvasLinkSvgLand>

        {values(view.elements).map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            element,
            SubComponent:
              props.elementConfig.components[element.state.type].component,
          };
          return <ElementContainer key={vProps.element.id} {...vProps} />;
        })}
      </CanvasArtboard>

      <CanvasToolbar hide={hideToolbar} />
    </CanvasViewport>
  );
};

export default React.memo(Canvas);
