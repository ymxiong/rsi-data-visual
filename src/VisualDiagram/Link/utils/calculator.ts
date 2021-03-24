import { ElementView } from '../../../VisualDiagram/logic/element/ElementView';
import { LinkView } from '../../../VisualDiagram/logic/link/LinkView';
import { Point } from '../../logic/utils/Point';

const ELEMENT_LINK_MARGIN = 25;

export const calcPointsBetweenElement = (
  elements: {
    [id: string]: ElementView;
  },
  links: {
    [id: string]: LinkView;
  },
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
  const SOURCE_LINK_TOTAL = fromElement.linkSourceIds.length;
  const TARGET_LINK_TOTAL = toElement.linkTargetIds.length;

  let sourceIndex = 0;
  for (let index = 0; index < fromElement.linkSourceIds.length; index += 1) {
    const linkId = fromElement.linkSourceIds[index];
    const linkView = links[linkId];
    const elementToNeedSort = elements[linkView.state.toElementId];
    if (elementToNeedSort.state.x < toElement.state.x) {
      sourceIndex += 1;
    }
  }

  let targetIndex = 0;
  for (let index = 0; index < toElement.linkTargetIds.length; index += 1) {
    const linkId = toElement.linkTargetIds[index];
    const linkView = links[linkId];
    const elementFromNeedSort = elements[linkView.state.fromElementId];
    if (elementFromNeedSort.state.x < fromElement.state.x) {
      targetIndex += 1;
    }
  }
  const FROM_ELEMENT_PADDING_SINGLE = fromElement.size.width / (SOURCE_LINK_TOTAL + 1);
  const FROM_ELEMENT_PADDING = FROM_ELEMENT_PADDING_SINGLE * (sourceIndex + 1);

  const TO_ELEMENT_PADDING_SINGLE = toElement.size.width / (TARGET_LINK_TOTAL + 1);
  const TO_ELEMENT_PADDING = TO_ELEMENT_PADDING_SINGLE * (targetIndex + 1);

  const fromElementB: Point = {
    x: FROM_ELEMENT_POINT.x,
    y: FROM_ELEMENT_POINT.y + fromElement.size.height,
  };

  const toElementA: Point = {
    x: TO_ELEMENT_POINT.x,
    y: TO_ELEMENT_POINT.y,
  };

  // 初始化源头点位置
  const sourcePoint: Point = {
    x: fromElementB.x + FROM_ELEMENT_PADDING,
    y: fromElementB.y,
  };

  // 初始化目标点位置
  const targetPoint: Point = {
    x: toElementA.x + TO_ELEMENT_PADDING,
    y: toElementA.y,
  };

  // （如果源头元素y值+偏执）大于（目标元素y值），既源头元素在下面，需要插点转向
  if (
    sourcePoint.y + ELEMENT_LINK_MARGIN * (sourceIndex + targetIndex + 2)
    > targetPoint.y
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
    // 当x值靠的很近的时候，需要对x进行范围扩展
    if (
      FROM_ELEMENT_POINT.x - TO_ELEMENT_POINT.x < fromElement.size.width
      && TO_ELEMENT_POINT.x - FROM_ELEMENT_POINT.x < fromElement.size.width
    ) {
      midPoint1.x += fromElement.size.width;
      midPoint2.x += fromElement.size.width;
      // 当x值靠的很近且当y值靠的很近的时候，需要对y进行范围扩展
      // if (
      //   TO_ELEMENT_POINT.y - FROM_ELEMENT_POINT.y
      //   < ELEMENT_LINK_MARGIN * (sourceIndex + targetIndex + 2)
      //   && TO_ELEMENT_POINT.y - FROM_ELEMENT_POINT.y > 0
      // ) {
      //   midPoint0.y += fromElement.size.height * 2;
      //   midPoint1.y += fromElement.size.height * 2;
      // }
    }

    return [
      sourcePoint,
      midPoint0,
      midPoint1,
      midPoint2,
      midPoint3,
      targetPoint,
    ];
  }

  // 通常情况直接取中间值即可
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
