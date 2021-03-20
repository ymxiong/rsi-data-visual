import React from 'react';
import { Point } from '../../../logic/utils/Point';
import Arrow from '../Arrow';
import { Line } from '../Line';

type BodyProps = {
  hasArrow: boolean;
  showName: boolean;
  color: string;
  points: Point[];
  name: string;
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

  const calTextWidth = (text: string) => {
    const dom = document.createElement('span');
    dom.style.display = 'inline-block';
    dom.textContent = text;
    document.body.appendChild(dom);
    const width = dom.clientWidth;
    document.body.removeChild(dom);
    return width;
  };

  const calTextPoints = (points: Point[]) => {
    const first = points[1];
    const second = points[2];

    if (first.x === second.x) {
      return { point: { x: second.x + 14, y: second.y }, direction: 'v' };
    }
    return {
      point:
        first.x > second.x
          ? { x: first.x - calTextWidth(props.name), y: first.y - 5 }
          : { ...first, y: first.y - 5 },
      direction: 'h',
    };
  };

  const namePoint = calTextPoints(props.points);

  return (
    <g>
      <Line
        d={linePointsStr}
        fill="none"
        color={props.color}
        name={props.name}
        namePoint={namePoint.point}
        direction={namePoint.direction}
        showName={props.showName}
      />
      {props.hasArrow && (
        <Arrow color={props.color} d={pointsToString(arrowPoints)} />
      )}
    </g>
  );
};

export default Body;
