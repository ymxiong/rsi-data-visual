import React from 'react';
import style from 'styled-components';

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
};

const Line: React.FC<LineProps> = (props: LineProps) => {
  return (
    <>
      <defs>
        <filter id="f1" x="-20" y="-20" width="200" height="200">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <LineStyle
        {...props}
        // filter="drop-shadow(-25px 25px 25px rgba(26,58,70,0.7))"
        filter="url(#f1)"
      />
    </>
  );
};

export { Line };
