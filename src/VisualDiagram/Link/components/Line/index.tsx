import React from 'react';
import style from 'styled-components';

export const Line = style.path`
  fill: ${(props) => (props.fill ? props.fill : 'none')};
  stroke-width: .2em;
  stroke: ${(props) => props.color || 'black'} ;
  stroke-linejoin: round;
`;
