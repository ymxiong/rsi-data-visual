import { View } from '../../../VisualDiagram/logic/view/View';
import { ElementView } from '../../../VisualDiagram/logic/element/ElementView';
import { LinkView } from '../../../VisualDiagram/logic/link/LinkView';
import { Point } from '../../logic/utils/Point';

// TODO: 位置排序与线条交错问题
export const calcPointsBetweenElement = (
  view: View,
  fromElement: ElementView,
  toElement: ElementView,
  link: LinkView,
  offset: Point,
): Array<Point> => {
  const FROM_ELEMENT_POINT = {
    x: fromElement.state.x - offset.x,
    y: fromElement.state.y - offset.y,
  };
  const TO_ELEMENT_POINT = {
    x: toElement.state.x - offset.x,
    y: toElement.state.y - offset.y,
  };
  const ELEMENT_LINK_MARGIN = 25;
  const SOURCE_LINK_TOTAL = fromElement.linkSourceIds.length;
  const TARGET_LINK_TOTAL = toElement.linkTargetIds.length;

  let sourceIndex = 0;
  for (let index = 0; index < fromElement.linkSourceIds.length; index += 1) {
    const linkId = fromElement.linkSourceIds[index];
    const linkView = view.links[linkId];
    const elementToNeedSort = view.elements[linkView.state.toElementId];
    if (elementToNeedSort.state.x < toElement.state.x) {
      sourceIndex += 1;
    }
  }

  let targetIndex = 0;
  for (let index = 0; index < toElement.linkTargetIds.length; index += 1) {
    const linkId = toElement.linkTargetIds[index];
    const linkView = view.links[linkId];
    const elementFromNeedSort = view.elements[linkView.state.fromElementId];
    if (elementFromNeedSort.state.x < fromElement.state.x) {
      targetIndex += 1;
    }
  }

  const FROM_ELEMENT_PADDING = (fromElement.width / (SOURCE_LINK_TOTAL + 1)) * (sourceIndex + 1);
  const TO_ELEMENT_PADDING = (fromElement.width / (TARGET_LINK_TOTAL + 1)) * (targetIndex + 1);

  const fromElementB: Point = {
    x: FROM_ELEMENT_POINT.x,
    y: FROM_ELEMENT_POINT.y + fromElement.height,
  };

  const toElementA: Point = {
    x: TO_ELEMENT_POINT.x,
    y: TO_ELEMENT_POINT.y,
  };

  const sourcePoint: Point = {
    x: fromElementB.x + FROM_ELEMENT_PADDING,
    y: fromElementB.y,
  };

  const targetPoint: Point = {
    x: toElementA.x + TO_ELEMENT_PADDING,
    y: toElementA.y,
  };

  if (
    sourcePoint.y - targetPoint.y
    > -1 * (ELEMENT_LINK_MARGIN * (sourceIndex + targetIndex + 2))
  ) {
    const midPoint0: Point = {
      x: sourcePoint.x,
      y: sourcePoint.y + ELEMENT_LINK_MARGIN * (sourceIndex + 1),
    };

    const midPoint1: Point = {
      x: (sourcePoint.x + targetPoint.x) / 2,
      y: sourcePoint.y + ELEMENT_LINK_MARGIN * (sourceIndex + 1),
    };

    const midPoint2: Point = {
      x: (sourcePoint.x + targetPoint.x) / 2,
      y: targetPoint.y - ELEMENT_LINK_MARGIN * (targetIndex + 1),
    };

    const midPoint3: Point = {
      x: targetPoint.x,
      y: targetPoint.y - ELEMENT_LINK_MARGIN * (targetIndex + 1),
    };
    return [
      sourcePoint,
      midPoint0,
      midPoint1,
      midPoint2,
      midPoint3,
      targetPoint,
    ];
  }

  const midPoint2: Point = {
    x: sourcePoint.x,
    y: (sourcePoint.y + targetPoint.y) / 2,
  };

  const midPoint3: Point = {
    x: targetPoint.x,
    y: (sourcePoint.y + targetPoint.y) / 2,
  };
  return [sourcePoint, midPoint2, midPoint3, targetPoint];
};
