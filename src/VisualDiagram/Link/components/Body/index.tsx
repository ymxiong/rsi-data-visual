import React from 'react';
import Point from 'src/VisualDiagram/logic/utils/Point';
import { Line } from '../Line';

type BodyProps = {
  id: string;
  color: string;
  points: Point[];
};

const Body = (props: BodyProps) => {
  const pointsToString = (points: Array<Point>): string => points
    .reduce((acc, curr) => `${acc} ${curr.x},${curr.y} L`, 'M')
    .replace(/ L$/, '');

  const pointsStr = pointsToString(props.points);
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
      <Line d={pointsStr} id={`line${props.id}`} color={props.color} />
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
