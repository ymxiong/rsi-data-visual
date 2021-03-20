import React from 'react';
import { Point } from '../../../logic/utils/Point';
import Arrow from '../Arrow';
import { Line } from '../Line';

type BodyProps = {
  hasArrow: boolean;
  color: string;
  points: Point[];
};

const Body: React.FC<BodyProps> = (props: BodyProps) => {
  const pointsToString = (points: Array<Point>): string => {
    let point: Point | undefined;
    return points
      .reduce((acc, curr) => {
        // 如果point存在，且出现了x值或者y值相等的情况，进行插值
        let result = acc;
        if (point) {
          if (point.x === curr.x) {
            result = `${result} ${curr.x + 0.1},${(point.y + curr.y) / 2} L`;
          } else if (point.y === curr.y) {
            result = `${result} ${(point.x + curr.x) / 2},${curr.y + 0.1} L`;
          }
        }
        point = curr;
        return `${result} ${curr.x},${curr.y} L`;
      }, 'M')
      .replace(/ L$/, '');
  };

  const arrowMainLen = 8;
  const arrowPadding = 1;
  const calArrowPoints = (end: Point) => {
    return [
      { x: end.x + arrowMainLen, y: end.y - arrowMainLen - arrowPadding },
      {
        x: end.x,
        y: end.y - arrowPadding,
      },
      {
        x: end.x - arrowMainLen,
        y: end.y - arrowMainLen - arrowPadding,
      },
    ];
  };

  const linePointsStr = pointsToString(props.points);
  const arrowPoints = calArrowPoints(props.points[props.points.length - 1]);

  return (
    <g>
      <Line d={linePointsStr} fill="none" color={props.color} />
      {props.hasArrow && (
        <Arrow color={props.color} d={pointsToString(arrowPoints)} />
      )}
    </g>
  );
};

export default Body;
