import React from 'react';
import style from 'styled-components';
import { Point } from '../../../logic/utils/Point';

const LineStyle = style.path`
  min-height:10px;
  min-weigth:10px
  fill: ${(props) => (props.fill ? props.fill : 'none')};
  stroke-width: .2em;
  stroke: ${(props) => props.color || 'black'} ;
  stroke-linejoin: round;
`;

type LineProps = {
  fill: string;
  color: string;
  d: string;
  name: string;
  namePoint: Point;
  direction: string;
  showName: boolean;
};

const Line: React.FC<LineProps> = (props: LineProps) => {
  return (
    <>
      <defs>
        <filter id="linkShadow" x="-20" y="-20" width="200" height="200">
          {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" /> */}
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <LineStyle {...props} filter="url(#linkShadow)" />
      {props.showName && (
        <text
          x={props.namePoint.x}
          y={props.namePoint.y}
          stroke={props.color}
          writingMode={props.direction === 'v' ? 'tb' : ''}
        >
          {props.name}
        </text>
      )}
    </>
  );
};

export { Line };
