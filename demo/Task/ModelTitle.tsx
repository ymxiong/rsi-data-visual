import React from 'react';
import hex2Rgba from './hex2Rgba';

interface ModelTitleProps {
  modelTitle: string;
  color: string;
}
const LiStyle = {
  lineHeight: '30px',
  paddingLeft: '10px',
  paddingRight: '20px',
  borderBottom: '1px solid #eee',
  fontSize: '13px',
};

const ModelTitle = (props: ModelTitleProps): JSX.Element => {
  const { modelTitle, color } = props;
  return (
    <li
      key={modelTitle}
      style={{
        ...LiStyle,
        fontWeight: 'bold',
        textAlign: 'center',
        background: color
          ? `linear-gradient(to right, ${hex2Rgba(color)},${hex2Rgba(
            color,
            0.8,
          )},${hex2Rgba(color, 0.5)})`
          : '#fff',
        color: color ? '#fff' : '',
      }}
    >
      {modelTitle}
    </li>
  );
};

export { ModelTitle, LiStyle };
