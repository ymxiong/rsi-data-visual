import React from 'react';
import { Point } from '../../../logic/utils/Point';
import Body from '../Body';

type DefaultLineProps = {
  points: Point[];
  color: string;
  hasArrow: boolean;
  showName: boolean;
  linkName: string;
};

const DefaultLink: React.FC<DefaultLineProps> = (props: DefaultLineProps) => {
  return (
    <Body
      hasArrow={props.hasArrow}
      color={props.color}
      points={props.points}
      name={props.linkName}
      showName={props.showName}
    />
  );
};

export { DefaultLink };
