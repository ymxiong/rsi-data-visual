import React, { ComponentType } from 'react';
import { VisualLinkProps } from '../../../types';
import { LinkGroupView } from '../logic/link/LinkGroupView';

export type LinkGroupContainerProps = {
  linkGroup: LinkGroupView;
  SubComponent?: ComponentType<VisualLinkProps>;
};

const LinkGroupContainer: React.FC<LinkGroupContainerProps> = (props) => {
  return <div />;
};

export default React.memo(LinkGroupContainer);
