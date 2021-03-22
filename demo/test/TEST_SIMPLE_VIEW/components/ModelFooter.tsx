import React from 'react';

const LiStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '32px',
  fontSize: '16px',
  lineHeight: '32px',
};

const ModelFooter = (): JSX.Element => {
  return <li style={{ ...LiStyle }}></li>;
};

export default ModelFooter;
