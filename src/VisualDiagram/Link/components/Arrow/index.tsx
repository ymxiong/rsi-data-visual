import React from 'react';
import style from 'styled-components';
// import style from 'styled-components';

const ArrowStyle = style.path`
  name: "三角形";
  fill: ${(props) => (props.color ? props.color : 'black')};
  stroke: ${(props) => props.color || 'black'} ;
  stroke-linejoin: round;
`;

type ArrowProps = {
  color: string;
  d: string;
};

const Arrow = (props: ArrowProps): JSX.Element => (
  <>
    <defs>
      <filter id="arrowShadow" x="-20" y="-20" width="200" height="200">
        {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" /> */}
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <ArrowStyle {...props} filter="url(#arrowShadow)" />
  </>
);

export default Arrow;
