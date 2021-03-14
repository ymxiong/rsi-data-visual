import React from 'react';
import style from 'styled-components';

// const ArrowStyle = style.path`
//   fill: ${(props) => props.color || 'black'};
//   stroke-width: 1px;
//   stroke-linecap: round;
//   stroke-dasharray: 10000, 1;
// `;

type ArrowProps = {
  color: string;
  d: string;
};

const Arrow = (props: ArrowProps): JSX.Element => (
  <path
    name="三角形"
    fill={props.color || 'black'}
    stroke={props.color || 'black'}
    d={props.d}
  />
);

export default Arrow;
