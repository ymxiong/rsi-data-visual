import { ElementView } from '../../../VisualDiagram/logic/element/ElementView';
import { LinkView } from '../../../VisualDiagram/logic/link/LinkView';
import { Point } from '../../logic/utils/Point';

export const calcPointsBetweenElement = (
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
    if (fromElement.linkSourceIds[index] === link.id) {
      break;
    }
    sourceIndex += 1;
  }

  let targetIndex = 0;
  for (let index = 0; index < toElement.linkTargetIds.length; index += 1) {
    if (toElement.linkTargetIds[index] === link.id) {
      break;
    }
    targetIndex += 1;
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

  if (sourcePoint.y - targetPoint.y > -2 * ELEMENT_LINK_MARGIN) {
    const midPoint0: Point = {
      x: sourcePoint.x,
      y: sourcePoint.y + ELEMENT_LINK_MARGIN,
    };

    const midPoint1: Point = {
      x: (sourcePoint.x + targetPoint.x) / 2,
      y: sourcePoint.y + ELEMENT_LINK_MARGIN,
    };

    const midPoint2: Point = {
      x: (sourcePoint.x + targetPoint.x) / 2,
      y: targetPoint.y - ELEMENT_LINK_MARGIN,
    };

    const midPoint3: Point = {
      x: targetPoint.x,
      y: targetPoint.y - ELEMENT_LINK_MARGIN,
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
