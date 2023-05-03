import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../store/hooks';
import { values } from 'lodash-es';
import {
  VisualElementConfig,
  VisualLinkConfig,
  VisualGlobalConfig,
  Pendant,
} from '../../../../../types';
import { Store } from '../../../store';
import {
  selectElement,
  refreshCanvasScale,
  refreshCanvasAnchored,
  refreshCanvasOffset,
  refreshElement,
} from '../../../store/canvas/actions';
import { refreshToolbarItemBatch } from '../../../store/diagram/actions';

import ElementContainer, { ElementContainerProps } from '../../../Element';
import LinkContainer, { LinkContainerProps } from '../../../Link';
import LinkGroupContainer, {
  LinkGroupContainerProps,
} from '../../../LinkGroup';
import { ElementView } from '../../../logic/element/ElementView';
import { LinkView } from '../../../logic/link/LinkView';
import { LinkGroupView } from '../../../logic/link/LinkGroupView';
import { zoomLevels } from '../../../logic/utils/Scale';

import { CanvasLinkSvgLand } from '../CanvasLinkSvgLand';
import CanvasViewport from '../CanvasViewport';
import { CanvasArtboard, CanvasArtboardProps } from '../CanvasArtboard';
import CanvasToolbar from '../CanvasToolbar';
import { toolbarConfig } from '../CanvasToolbar/defaultToolbar';
import CanvasLoading from '../CanvasLoading';
import { onCanvasZoomIn, onCanvasZoomOut } from './handler/canvasHandler';

type CanvasProps = {
  elementConfig: VisualElementConfig;
  linkConfig: VisualLinkConfig;
  globalConfig: VisualGlobalConfig;
  loading: boolean;
  handleRef: (element: HTMLDivElement) => void;
};

const Canvas = (props: CanvasProps): JSX.Element => {
  const dispatch = useDispatch();

  const elements = useSelector((state: Store) => state.canvas.view.elements);

  const links = useSelector((state: Store) => state.canvas.view.links);

  const linkGroups = useSelector(
    (state: Store) => state.canvas.view.linkGroups,
  );

  const selectElementId = useSelector(
    (state: Store) => state.canvas.view.selectedElementId,
  );

  const filterElementIdList = useSelector(
    (state: Store) => state.canvas.view.filterElementIdList,
  );

  const canvasLocked = useSelector(
    (state: Store) => state.canvas.canvas.state.locked,
  );

  const canvasAnchored = useSelector(
    (state: Store) => state.canvas.canvas.anchored,
  );

  const canvasSize = useSelector((state: Store) => state.canvas.canvas.size);

  const canvasOffset = useSelector(
    (state: Store) => state.canvas.canvas.offset,
  );

  const canvasOffsetForElement = useSelector(
    (state: Store) => state.canvas.canvas.offsetForComponent,
  );

  const canvasMargin = useSelector(
    (state: Store) => state.canvas.canvas.margin,
  );

  const canvasScale = useSelector(
    (state: Store) => state.canvas.canvas.state.scale,
  );

  const viewOffset = useSelector((state: Store) => state.canvas.view.offset);

  const [hideToolbar, setToolbarHide] = useState(false);

  const onZoomIn = useCallback(() => {
    onCanvasZoomIn(dispatch, canvasScale);
  }, [canvasScale, dispatch]);

  const onZoomOut = useCallback(() => {
    onCanvasZoomOut(dispatch, canvasScale);
  }, [canvasScale, dispatch]);

  const onSort = useCallback(() => {
    dispatch(refreshCanvasScale(canvasScale));
  }, [canvasScale, dispatch]);

  const canvasArtboardProps: CanvasArtboardProps = {
    scale: zoomLevels[canvasScale],
    offset: {
      x: canvasOffset.x,
      y: canvasOffset.y,
    },
    size: {
      width: canvasSize.width,
      height: canvasSize.height,
    },
    gridSize: props.globalConfig.gridSize,
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
          dispatch(refreshCanvasAnchored(false));
        } else if (!element.state.locked) {
          // 如果被铆钉，计算新的x，y值
          const refreshView = { ...element };

          refreshView.state.x = (ev.clientX - canvasMargin.x) / zoomLevels[canvasScale]
            - canvasOffsetForElement.x
            + viewOffset.x
            - element.mouseOffset.x;
          refreshView.state.y = (ev.clientY - canvasMargin.y) / zoomLevels[canvasScale]
            - canvasOffsetForElement.y
            + viewOffset.y
            - element.mouseOffset.y;
          dispatch(refreshElement(refreshView));
        }
      }
    },
    [canvasMargin, canvasOffsetForElement, canvasScale, viewOffset, dispatch],
  );

  const onCanvasMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasAnchored) {
      setToolbarHide(true);
      if (ev.buttons !== 1 || canvasLocked) {
        // 如果被铆钉但鼠标已松开，释放铆钉
        dispatch(refreshCanvasAnchored(false));
      } else {
        // 如果被铆钉，计算新的x，y值
        const offset = canvasOffset;
        offset.x
          += ev.movementX * 1.2 * zoomLevels[zoomLevels.length - 1 - canvasScale];
        offset.y
          += ev.movementY * 1.2 * zoomLevels[zoomLevels.length - 1 - canvasScale];
        dispatch(refreshCanvasOffset(offset));
      }
    }

    // 目标元素的监听问题
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

  const onMouseUp = () => {
    setToolbarHide(false);
    dispatch(selectElement('', false));
    dispatch(refreshCanvasAnchored(false));
  };

  const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCanvasMove(ev);
  };

  const onMouseLeave = () => {
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
      refreshToolbarItemBatch(toolbarConfig(onZoomIn, onZoomOut, onSort)),
    );
  }, [dispatch, onSort, onZoomIn, onZoomOut]);

  return (
    <CanvasViewport ref={(div: HTMLDivElement) => props.handleRef(div)}>
      <CanvasLoading loading={props.loading} />
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
            if (
              filterElementIdList
              && filterElementIdList.length !== 0
              && (filterElementIdList.indexOf(link.state.fromElementId) === -1
                || filterElementIdList.indexOf(link.state.toElementId) === -1)
            ) {
              return <></>;
            }
            const vProps: LinkContainerProps = {
              elements,
              links,
              link,
              hasArrow: props.linkConfig.components[link.state.type].hasArrow,
              showName: props.linkConfig.components[link.state.type].showName,
              SubComponent:
                props.linkConfig.components[link.state.type].component,
              pendant: link.state.pendant,
            };
            return <LinkContainer key={vProps.link.id} {...vProps} />;
          })}
          {values(linkGroups).map((linkGroup: LinkGroupView) => {
            const vProps: LinkGroupContainerProps = {
              linkGroup,
              SubComponent:
                props.linkConfig.components[linkGroup.links[0].state.type]
                  .component,
            };
            return <LinkGroupContainer key={linkGroup.id} {...vProps} />;
          })}
        </CanvasLinkSvgLand>

        {values(elements).map((element: ElementView) => {
          if (
            filterElementIdList
            && filterElementIdList.length !== 0
            && filterElementIdList.indexOf(element.id) === -1
          ) {
            return <></>;
          }
          const linksIn: Pendant[] = [];
          const linksOut: Pendant[] = [];

          element.topSlots.forEach((slot) => {
            const { pendant } = links[slot.linkId].state;
            if (pendant) {
              linksIn.push(pendant);
            }
          });

          element.bottomSlots.forEach((slot) => {
            const { pendant } = links[slot.linkId].state;
            if (pendant) {
              linksOut.push(pendant);
            }
          });

          let pendant: Pendant;
          if (element.state.pendant) {
            pendant = {
              data: {
                type: element.state.pendant.data.type,
                detail: {
                  ...element.state.pendant.data.detail,
                  linksIn,
                  linksOut,
                },
              },
              onDataChange: element.state.pendant.onDataChange,
            };
          } else {
            pendant = {
              data: {
                type: 'model',
                detail: {
                  linksIn,
                  linksOut,
                },
              },
              onDataChange: () => {},
            };
          }

          const vProps: ElementContainerProps = {
            element,
            viewOffset,
            onElementMove,
            setToolbarHide,
            pendant,
            minSize: props.elementConfig.components[element.state.type].minSize,
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
