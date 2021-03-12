import React from 'react';
import Point from '../../../logic/utils/Point';
import { Line } from '../Line';

type BodyProps = {
  color: string;
  points: Point[];
};

const Body = (props: BodyProps) => {
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

  const pointsStr = pointsToString(props.points);

  // const arrowPoints = calArrowPoints(
  //   points[points.length - 1],
  //   arrowDirection
  // );

  return (
    <g>
      {/* {customLink ? (
      <CustomLink
        lineId={newId}
        pointsStr={pointsStr}
        points={pointsToString(arrowPoints)}
        onSubmit={this.handleCustomSubmit}
        onDelete={this.props.handleDelete}
        {...others}
      />
    ) : ( */}
      <Line d={pointsStr} fill="none" color={props.color} />
      {/* )} */}
      {/* {this.props.hasArrow && (
      <ArrowMarker
        color={this.props.color}
        points={pointsToString(arrowPoints)}
      />
    )} */}
    </g>
  );
};

export default Body;
