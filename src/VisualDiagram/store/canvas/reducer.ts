import { Reducer } from 'redux';
import { standardOffset } from '../../logic/utils/Point';
import { Canvas, buildCanvasFromCanvasState } from '../../logic/canvas/Canvas';
import { View, getViewTemplate } from '../../logic/view/View';
import { CanvasAction } from './types';
import { zoomLevels } from '../../logic/utils/Scale';
import { buildSlotView } from '../../logic/slot/SlotView';
import {
  ElementView,
  refreshElementSlot,
} from '../../logic/element/ElementView';

export interface CanvasState {
  canvas: Canvas;
  view: View;
}

function getInitialCanvasState(): CanvasState {
  return {
    canvas: buildCanvasFromCanvasState(),
    view: getViewTemplate(),
  };
}

const canvasReducer: Reducer<CanvasState, CanvasAction> = (
  state = getInitialCanvasState(),
  action,
) => {
  switch (action.type) {
    case 'canvas/refresh': {
      const refreshState = {
        ...state,
        canvas: { ...action.payload },
      };
      if (
        refreshState.canvas.size.width + refreshState.canvas.offset.x
          < refreshState.canvas.viewport.width
            / zoomLevels[refreshState.canvas.state.scale]
        || refreshState.canvas.size.height + refreshState.canvas.offset.y
          < refreshState.canvas.viewport.height
            / zoomLevels[refreshState.canvas.state.scale]
      ) {
        refreshState.canvas.size.width -= standardOffset.x;
        refreshState.canvas.size.height -= standardOffset.y;
      }
      if (
        refreshState.canvas.offset.x > 0
        || refreshState.canvas.offset.y > 0
      ) {
        refreshState.canvas.offset.x += standardOffset.x;
        refreshState.canvas.offset.y += standardOffset.y;
        refreshState.canvas.size.width -= standardOffset.x;
        refreshState.canvas.size.height -= standardOffset.y;
        refreshState.view.offset.x += standardOffset.x;
        refreshState.view.offset.y += standardOffset.y;
      }
      return refreshState;
    }
    case 'canvas/viewport/size/refresh': {
      const refreshState = state;
      if (
        refreshState.canvas.viewport.height < action.payload.height
        || refreshState.canvas.viewport.width < action.payload.width
      ) {
        refreshState.canvas.viewport = {
          ...refreshState.canvas.viewport,
          ...action.payload,
        };
        if (
          refreshState.canvas.size.height
            < action.payload.height - 2 * standardOffset.y
          || refreshState.canvas.size.width
            < action.payload.width - 2 * standardOffset.x
        ) {
          refreshState.canvas.size = {
            ...refreshState.canvas.size,
            width: refreshState.canvas.viewport.width - 2 * standardOffset.x,
            height: refreshState.canvas.viewport.height - 2 * standardOffset.y,
          };
        }
      }
      return refreshState;
    }
    case 'canvas/scale/refresh': {
      const refreshState = state;
      refreshState.view.elements = {
        ...refreshState.view.elements,
      };
      refreshState.canvas.state = {
        ...refreshState.canvas.state,
        scale: action.payload,
      };
      return refreshState;
    }
    case 'canvas/locked/refresh': {
      const refreshState = state;
      refreshState.canvas.state = {
        ...refreshState.canvas.state,
        locked: action.payload,
      };
      return refreshState;
    }
    case 'canvas/anchored/refresh': {
      const refreshState = state;
      refreshState.canvas = {
        ...refreshState.canvas,
        anchored: action.payload,
        offsetForComponent: refreshState.canvas.offset,
      };
      return refreshState;
    }
    case 'canvas/offset/refresh': {
      const refreshState = state;
      refreshState.canvas.offset = {
        ...refreshState.canvas.offset,
        ...action.payload,
      };
      if (
        refreshState.canvas.size.width + refreshState.canvas.offset.x
          < refreshState.canvas.viewport.width
            / zoomLevels[refreshState.canvas.state.scale]
        || refreshState.canvas.size.height + refreshState.canvas.offset.y
          < refreshState.canvas.viewport.height
            / zoomLevels[refreshState.canvas.state.scale]
      ) {
        refreshState.canvas.size = { ...refreshState.canvas.size };
        refreshState.canvas.size.width -= standardOffset.x;
        refreshState.canvas.size.height -= standardOffset.y;
      }
      if (
        refreshState.canvas.offset.x > 0
        || refreshState.canvas.offset.y > 0
      ) {
        refreshState.canvas.size = { ...refreshState.canvas.size };
        refreshState.view.offset = { ...refreshState.view.offset };
        refreshState.canvas.offset.x += standardOffset.x;
        refreshState.canvas.offset.y += standardOffset.y;
        refreshState.canvas.size.width -= standardOffset.x;
        refreshState.canvas.size.height -= standardOffset.y;
        refreshState.view.offset.x += standardOffset.x;
        refreshState.view.offset.y += standardOffset.y;
      }
      return refreshState;
    }
    case 'canvas/offset/for/element/refresh': {
      const refreshState = state;
      refreshState.canvas.offsetForComponent = {
        ...refreshState.canvas.offset,
      };
      return refreshState;
    }
    case 'canvas/margin/refresh': {
      const refreshState = state;
      refreshState.canvas.margin = {
        ...refreshState.canvas.margin,
        ...action.payload,
      };
      return refreshState;
    }
    case 'canvas/view/refresh': {
      return {
        ...state,
        view: { ...action.payload },
      };
    }
    case 'canvas/element/refresh': {
      const refreshState = state;
      const elementView: ElementView = action.payload;
      refreshState.view.elements[elementView.id] = refreshElementSlot(
        elementView,
      );
      return refreshState;
    }
    case 'canvas/element/locked/refresh': {
      const refreshState = state;
      refreshState.view.elements[action.payload.elementId] = {
        ...refreshState.view.elements[action.payload.elementId],
      };
      refreshState.view.elements[action.payload.elementId].state.locked = action.payload.locked;
      return refreshState;
    }
    case 'canvas/element/anchored/refresh': {
      const refreshState = state;
      refreshState.view.elements[action.payload.elementId] = {
        ...refreshState.view.elements[action.payload.elementId],
        anchored: action.payload.anchored,
      };
      return refreshState;
    }
    case 'canvas/element/size/refresh': {
      const refreshState = state;
      refreshState.view.elements[action.payload.elementId] = {
        ...refreshState.view.elements[action.payload.elementId],
        size: action.payload.size,
      };
      refreshState.view.elements[action.payload.elementId] = refreshElementSlot(
        refreshState.view.elements[action.payload.elementId],
      );
      return refreshState;
    }
    case 'canvas/element/position/refresh': {
      const refreshState = state;
      refreshState.view.elements[action.payload.elementId] = {
        ...refreshState.view.elements[action.payload.elementId],
      };
      refreshState.view.elements[action.payload.elementId].state.x = action.payload.position.x;
      refreshState.view.elements[action.payload.elementId].state.y = action.payload.position.y;
      return refreshState;
    }
    case 'canvas/element/create': {
      const refreshState = state;
      refreshState.view.elements = { ...state.view.elements };
      refreshState.view.elements[action.payload.id] = action.payload;
      return refreshState;
    }
    case 'canvas/element/filter': {
      const refreshState = state;
      refreshState.view.filterElementIdList = action.payload;
      return refreshState;
    }
    case 'canvas/element/delete': {
      const refreshState = state;
      refreshState.view.elements = { ...state.view.elements };
      refreshState.view.links = { ...state.view.links };
      const preDeleteElement = refreshState.view.elements[action.payload];
      const preDeleteLinkIds: string[] = [];
      const preRefactorElementIds: string[] = [];
      preDeleteElement.bottomSlots.forEach((slot) => {
        preDeleteLinkIds.push(slot.linkId);
        preRefactorElementIds.push(
          refreshState.view.links[slot.linkId].state.toElementId,
        );
        delete refreshState.view.links[slot.linkId];
      });
      preDeleteElement.topSlots.forEach((slot) => {
        preDeleteLinkIds.push(slot.linkId);
        preRefactorElementIds.push(
          refreshState.view.links[slot.linkId].state.fromElementId,
        );
        delete refreshState.view.links[slot.linkId];
      });
      preRefactorElementIds.forEach((elementId: string) => {
        refreshState.view.elements[
          elementId
        ].bottomSlots = refreshState.view.elements[
          elementId
        ].bottomSlots.filter((item) => !preDeleteLinkIds.includes(item.linkId));
        refreshState.view.elements[
          elementId
        ].topSlots = refreshState.view.elements[elementId].topSlots.filter(
          (item) => !preDeleteLinkIds.includes(item.linkId),
        );
      });
      delete refreshState.view.elements[action.payload];
      return refreshState;
    }
    case 'canvas/element/select': {
      const refreshState = { ...state };

      // 如果选择状态是个true，同时铆钉元素
      if (action.payload.selected) {
        refreshState.view.selectedElementId = action.payload.elementId;
        refreshState.view.elements[action.payload.elementId].anchored = true;
        return refreshState;
      }
      // 如果选择状态是个false，同时清除铆钉元素，这样就解决了鼠标速度过快离开绘制区域时，阻止元素跟跑的问题
      if (refreshState.view.selectedElementId) {
        refreshState.view.elements[
          refreshState.view.selectedElementId
        ].anchored = false;
        refreshState.view.selectedElementId = undefined;
      }
      return refreshState;
    }
    case 'canvas/link/create': {
      const refreshState = state;
      const elementFrom = {
        ...refreshState.view.elements[action.payload.state.fromElementId],
      };
      const elementTo = {
        ...refreshState.view.elements[action.payload.state.toElementId],
      };

      const slotFrom = buildSlotView(action.payload.id);
      const slotTo = buildSlotView(action.payload.id);

      elementFrom.bottomSlots.push(slotFrom);
      elementTo.topSlots.push(slotTo);

      refreshState.view.elements = { ...state.view.elements };
      refreshState.view.elements[
        action.payload.state.fromElementId
      ] = refreshElementSlot(elementFrom);
      refreshState.view.elements[
        action.payload.state.toElementId
      ] = refreshElementSlot(elementTo);
      refreshState.view.links = { ...state.view.links };
      refreshState.view.links[action.payload.id] = {
        ...action.payload,
        slotFrom,
        slotTo,
      };
      return refreshState;
    }
    case 'canvas/link/delete': {
      const refreshState = { ...state };
      const linkId = action.payload;
      const preDeleteLink = refreshState.view.links[action.payload];

      const elementFrom = refreshState.view.elements[preDeleteLink.state.fromElementId];
      const elementTo = refreshState.view.elements[preDeleteLink.state.toElementId];

      elementFrom.topSlots = elementFrom.topSlots.filter(
        (item) => linkId !== item.linkId,
      );

      elementTo.bottomSlots = elementTo.bottomSlots.filter(
        (item) => linkId !== item.linkId,
      );
      refreshState.view.elements[elementFrom.id] = elementFrom;
      refreshState.view.elements[elementTo.id] = elementTo;

      delete refreshState.view.links[action.payload];
      return refreshState;
    }
    case 'canvas/link/refresh': {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default canvasReducer;
