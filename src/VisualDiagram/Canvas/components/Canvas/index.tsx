import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../../store';
import { CanvasArtboard, CanvasArtboardProps } from '../CanvasArtboard';
import CanvasViewport from '../CanvasViewport';
import { CanvasLinkSvgLand } from '../CanvasLinkSvgLand';
import ElementContainer, { ElementContainerProps } from '../../../Element';
import {
  buildFromElementState,
  ElementView,
} from '../../../logic/element/ElementView';
import { LinkView } from '../../../logic/link/LinkView';
import { values } from 'lodash-es';
import LinkContainer, { LinkContainerProps } from '../../../Link';
import CanvasToolbar from '../CanvasToolbar';
import {
  addElement,
  refreshElement,
  selectElement,
  refreshCanvasScale,
  refreshCanvasAnchored,
  refreshCanvasOffset,
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

  const elements = useSelector((state: Store) => state.canvas.view.elements);

  const links = useSelector((state: Store) => state.canvas.view.links);

  const selectElementId = useSelector(
    (state: Store) => state.canvas.view.selectedElementId,
  );

  const canvasAnchored = useSelector(
    (state: Store) => state.canvas.canvas.anchored,
  );

  const canvasSize = useSelector((state: Store) => state.canvas.canvas.size);

  const canvasOffset = useSelector(
    (state: Store) => state.canvas.canvas.offset,
  );

  const canvasMargin = useSelector(
    (state: Store) => state.canvas.canvas.margin,
  );

  const canvasScale = useSelector(
    (state: Store) => state.canvas.canvas.state.scale,
  );

  const viewOffset = useSelector((state: Store) => state.canvas.view.offset);

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
    let scale = canvasScale;
    if (scale > zoomLevels.length - 2) {
      scale = zoomLevels.length - 1;
    } else {
      scale += 1;
    }
    dispatch(refreshCanvasScale(scale));
  }, [canvasScale, dispatch]);

  const onZoomOut = useCallback(() => {
    let scale = canvasScale;
    if (scale < 1) {
      scale = 0;
    } else {
      scale -= 1;
    }
    dispatch(refreshCanvasScale(scale));
  }, [canvasScale, dispatch]);

  const onSort = useCallback(() => {
    dispatch(refreshCanvasScale(canvasScale));
  }, [canvasScale, dispatch]);

  const canvasArtboardProps: CanvasArtboardProps = {
    offsetX: canvasOffset.x,
    offsetY: canvasOffset.y,
    scale: zoomLevels[canvasScale],
    width: canvasSize.width,
    height: canvasSize.height,
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

  const onElementMove = useCallback(
    (
      ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
      element: ElementView,
    ) => {
      if (element.anchored) {
        if (ev.buttons !== 1) {
          // 如果被铆钉但鼠标已松开，释放铆钉
          dispatch(refreshElement({ ...element, anchored: false }));
        } else {
          // 如果被铆钉，计算新的x，y值
          const refreshView = { ...element };
          refreshView.state.x = (ev.pageX - canvasMargin.x) / zoomLevels[canvasScale]
            - canvasOffset.x
            + viewOffset.x
            - element.width / 2;
          refreshView.state.y = (ev.pageY - canvasMargin.y) / zoomLevels[canvasScale]
            - canvasOffset.y
            + viewOffset.y
            - element.height / 2;
          dispatch(refreshElement(refreshView));
        }
      }
    },
    [canvasMargin, canvasOffset, canvasScale, viewOffset, dispatch],
  );

  const onCanvasMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasAnchored) {
      setToolbarHide(false);
      if (ev.buttons !== 1) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshCanvasAnchored(false));
      } else {
        // 如果被铆钉，计算新的x，y值
        const offset = canvasOffset;
        offset.x
          += ev.movementX * zoomLevels[zoomLevels.length - 1 - canvasScale];
        offset.y
          += ev.movementY * zoomLevels[zoomLevels.length - 1 - canvasScale];
        dispatch(refreshCanvasOffset(offset));
      }
    }

    // 滑出画布的监听问题
    if (selectElementId && elements[selectElementId].anchored) {
      setToolbarHide(true);
      const anchoredElement = elements[selectElementId];
      onElementMove(ev, anchoredElement);
    }
  };

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(refreshCanvasAnchored(true));
  };

  const onMouseUp = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvasAnchored(false));
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCanvasMove(ev);
  };

  const onMouseLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    dispatch(selectElement('', false));
    dispatch(refreshCanvasAnchored(false));
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
          {values(links).map((link: LinkView) => {
            const vProps: LinkContainerProps = {
              elements,
              links,
              link,
              linkConfig: props.linkConfig,
              SubComponent: props.elementConfig.components.model.component,
            };
            return <LinkContainer key={vProps.link.id} {...vProps} />;
          })}
        </CanvasLinkSvgLand>

        {values(elements).map((element: ElementView) => {
          const vProps: ElementContainerProps = {
            element,
            viewOffset,
            onElementMove,
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
