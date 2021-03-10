import { ElementView } from '../../../VisualDiagram/logic/element/ElementView';
import { LinkView } from '../../../VisualDiagram/logic/link/LinkView';
import Point from '../../logic/utils/Point';

export const calcPointsBetweenElement = (
  fromElement: ElementView,
  toElement: ElementView,
  link: LinkView,
): Array<Point> => {
  const startPoint: Point = {
    x: fromElement.state.x + fromElement.width,
    y: fromElement.state.y + 25,
  };
  const endPoint: Point = {
    x: toElement.state.x,
    y: toElement.state.y + 25,
  };

  return [startPoint, endPoint];
};

// const calcDefaultPointsAccordingToMainAxis = (
//   mainAxis: 'x' | 'y',
//   from: EntityModel,
//   to: Rect | EntityModel,
//   fromMid: Point,
//   toMid: Point
// ): Array<Point> => {
//   const crossAxis = mainAxis === 'x' ? 'y' : 'x';
//   const mainDimension = mainAxis === 'x' ? 'width' : 'height';
//   const crossDimension = mainAxis === 'x' ? 'height' : 'width';
//   let startPnt: Point;

//   // * 计算起始点，即当前方向的容器中点
//   if (from[mainAxis] > to[mainAxis]) {
//     startPnt = {
//       // $FlowFixMe
//       [mainAxis]: fromMid[mainAxis] - from[mainDimension] / 2,
//       // $FlowFixMe
//       [crossAxis]: fromMid[crossAxis],
//     };
//   } else {
//     startPnt = {
//       // $FlowFixMe
//       [mainAxis]: fromMid[mainAxis] + from[mainDimension] / 2,
//       // $FlowFixMe
//       [crossAxis]: fromMid[crossAxis],
//     };
//   }

//   if (
//     from[crossAxis] + from[crossDimension] > to[crossAxis] &&
//     from[crossAxis] < to[crossAxis] + to[crossDimension]
//   ) {
//     // If From and To are too close in the crossAxis
//     // ! 原本的这个距离计算有问题，不一样宽时折线位置会偏移
//     // const distance = (fromMid[mainAxis] + toMid[mainAxis]) / 2;

//     const lastPnt: Point = {
//       // $FlowFixMe
//       [mainAxis]:
//         from[mainAxis] > to[mainAxis]
//           ? toMid[mainAxis] + to[mainDimension] / 2
//           : toMid[mainAxis] - to[mainDimension] / 2,
//       // $FlowFixMe
//       [crossAxis]: toMid[crossAxis],
//     };

//     const distance = (startPnt[mainAxis] + lastPnt[mainAxis]) / 2;

//     const midPntAlpha: Point = {
//       // $FlowFixMe
//       [mainAxis]: distance,
//       // $FlowFixMe
//       [crossAxis]: fromMid[crossAxis],
//     };

//     const midPntBeta: Point = {
//       // $FlowFixMe
//       [mainAxis]: distance,
//       // $FlowFixMe
//       [crossAxis]: toMid[crossAxis],
//     };

//     return [startPnt, midPntAlpha, midPntBeta, lastPnt];
//   } else {
//     const midPoint: Point = {
//       // $FlowFixMe
//       [mainAxis]: toMid[mainAxis],
//       // $FlowFixMe
//       [crossAxis]: fromMid[crossAxis],
//     };

//     const lastPnt: Point = {
//       // $FlowFixMe
//       [mainAxis]: toMid[mainAxis],
//       // $FlowFixMe
//       [crossAxis]:
//         from[crossAxis] > to[crossAxis]
//           ? toMid[crossAxis] + to[crossDimension] / 2
//           : toMid[crossAxis] - to[crossDimension] / 2,
//     };

//     return [startPnt, midPoint, lastPnt];
//   }
// };

// const calcMid = (entity: EntityModel | Rect): Point => {
//   return {
//     x: entity.x + entity.width / 2,
//     y: entity.y + entity.height / 2,
//   };
// };

// // 判断 link 的主轴和方向，其中 direction 为 true 表示主轴方向方向为正向（向下或向右）
// export const calcLinkDirection = (from: Point, to: Point): LinkDirection => {
//   const mainAxis =
//     Math.abs(from.x - to.x) > Math.abs(from.y - to.y) ? 'x' : 'y';
//   const crossAxis = mainAxis === 'x' ? 'y' : 'x';
//   return {
//     mainAxis,
//     crossAxis,
//     mainDirection: to[mainAxis] >= from[mainAxis],
//     mainDifference: to[mainAxis] - from[mainAxis],
//     crossDirection: to[crossAxis] >= from[crossAxis],
//     crossDifference: to[crossAxis] - from[crossAxis],
//   };
// };

// const linesIntersection = (
//   p0: Point,
//   p1: Point,
//   p2: Point,
//   p3: Point
// ): ?Point => {
//   const s1x = p1.x - p0.x;
//   const s1y = p1.y - p0.y;
//   const s2x = p3.x - p2.x;
//   const s2y = p3.y - p2.y;
//   const s =
//     (-s1y * (p0.x - p2.x) + s1x * (p0.y - p2.y)) / (-s2x * s1y + s1x * s2y);
//   const t =
//     (s2x * (p0.y - p2.y) - s2y * (p0.x - p2.x)) / (-s2x * s1y + s1x * s2y);
//   return s >= 0 && s <= 1 && t >= 0 && t <= 1
//     ? { x: p0.x + t * s1x, y: p0.y + t * s1y }
//     : null;
// };

// const pointEntityIntersection = (from: Point, to: EntityModel): Point => {
//   const toMid: Point = {
//     x: to.x + to.width / 2,
//     y: to.y + to.height / 2,
//   };

//   const upLeft: Point = {
//     x: to.x,
//     y: to.y,
//   };
//   const upRight: Point = {
//     x: to.x + to.width,
//     y: to.y,
//   };
//   const downRight: Point = {
//     x: to.x + to.width,
//     y: to.y + to.height,
//   };
//   const downLeft: Point = {
//     x: to.x,
//     y: to.y + to.height,
//   };
//   const interUp = linesIntersection(upLeft, upRight, from, toMid);
//   const interRight = linesIntersection(upRight, downRight, from, toMid);
//   const interDown = linesIntersection(downRight, downLeft, from, toMid);
//   const interLeft = linesIntersection(downLeft, upLeft, from, toMid);
//   return interUp || interRight || interDown || interLeft || from;
// };

// const newPointTwins = (
//   inContact: Point,
//   wanderer: Point,
//   entity: EntityModel
// ): [Point, Point] => {
//   if (inContact.x === wanderer.x) {
//     //  ·
//     //  |
//     // ent
//     //  |
//     //  ·
//     if (inContact.y > wanderer.y) {
//       //  |
//       // ent
//       return [
//         {
//           x: entity.x + entity.width / 2,
//           y: entity.y,
//         },
//         {
//           x: entity.x + entity.width / 2,
//           y: wanderer.y,
//         },
//       ];
//     } else {
//       // ent
//       //  |
//       return [
//         {
//           x: entity.x + entity.width / 2,
//           y: entity.y + entity.height,
//         },
//         {
//           x: entity.x + entity.width / 2,
//           y: wanderer.y,
//         },
//       ];
//     }
//   }
//   if (inContact.y === wanderer.y) {
//     // · - ent - ·
//     if (inContact.x > wanderer.x) {
//       // - ent
//       return [
//         {
//           x: entity.x,
//           y: entity.y + entity.height / 2,
//         },
//         {
//           x: wanderer.x,
//           y: entity.y + entity.height / 2,
//         },
//       ];
//     } else {
//       // ent -
//       return [
//         {
//           x: entity.x + entity.width,
//           y: entity.y + entity.height / 2,
//         },
//         {
//           x: wanderer.x,
//           y: entity.y + entity.height / 2,
//         },
//       ];
//     }
//   }

//   const nonOrthogonalInContact = pointEntityIntersection(wanderer, entity);

//   return [nonOrthogonalInContact, wanderer];
// };

// const calcPointsOfEdited = (
//   from: EntityModel,
//   to: EntityModel,
//   link: ?Link
// ): Array<Point> => {
//   if (link == null || link.points == null) {
//     return [
//       { x: 0, y: 0 },
//       { x: 100, y: 100 },
//     ];
//   }

//   const points = link.points;

//   const [inContactFrom, wandererFrom] = newPointTwins(
//     points[0],
//     points[1],
//     from
//   );
//   const [inContactTo, wandererTo] = newPointTwins(
//     points[points.length - 1],
//     points[points.length - 2],
//     to
//   );

//   if (points.length <= 1) {
//     return [
//       { x: 0, y: 0 },
//       { x: 100, y: 100 },
//     ];
//   } else if (points.length === 2) {
//     const fromMid: Point = {
//       x: from.x + from.width / 2,
//       y: from.y + from.height / 2,
//     };
//     const fromMidToIntersection = pointEntityIntersection(fromMid, to);
//     return [fromMid, fromMidToIntersection];
//   } else if (points.length === 3) {
//     if (inContactFrom.x === wandererFrom.x) {
//       return [
//         inContactFrom,
//         { x: inContactFrom.x, y: inContactTo.y },
//         inContactTo,
//       ];
//     } else if (inContactFrom.y === wandererFrom.y) {
//       return [
//         inContactFrom,
//         { x: inContactTo.x, y: inContactFrom.y },
//         inContactTo,
//       ];
//     } else {
//       return [inContactFrom, points[1], inContactTo];
//     }
//   }

//   return [
//     inContactFrom,
//     wandererFrom,
//     ...points.slice(2, points.length - 2),
//     wandererTo,
//     inContactTo,
//   ];
// };

// const calcLinkPoints = (
//   from: ?EntityModel,
//   to: ?(Rect | EntityModel)
// ): Array<Point> => {
//   if (from == null || to == null) {
//     return [
//       { x: 0, y: 0 },
//       { x: 100, y: 100 },
//     ];
//   }

//   if (to.id) {
//     const toEnt: EntityModel = (to: any);
//     if (
//       from.linksTo &&
//       from.linksTo.some(
//         link => link.edited === true && link.target === toEnt.id
//       )
//     ) {
//       const link = from.linksTo.find(lnk => lnk.target === toEnt.id);
//       return calcPointsOfEdited(from, toEnt, link);
//     }
//   }

//   const fromMid = calcMid(from);
//   const toMid = calcMid(to);

//   const calcDirection = calcLinkDirection(fromMid, toMid);

//   return calcDefaultPointsAccordingToMainAxis(
//     calcDirection.mainAxis,
//     from,
//     to,
//     fromMid,
//     toMid
//   );
// };
