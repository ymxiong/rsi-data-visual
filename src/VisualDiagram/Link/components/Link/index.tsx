import React, { ReactNode } from 'react';
import { LinkView } from '../../../logic/link/LinkView';

type LinkProps = {
  link: LinkView;
  children: ReactNode;
};

export const Link = (props: LinkProps): JSX.Element => {
  return <g key={props.link.id}>{props.children}</g>;
};
