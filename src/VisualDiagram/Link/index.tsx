import React, { ComponentType } from 'react';
import { useSelector } from '../store/hooks';
import { Store } from '../store';
import { LinkView } from '../logic/link/LinkView';
import { calcPointsBetweenElement } from './utils/calculator';
import { selectRelationColor } from '../logic/utils/Color';
import { ElementView, Pendant, VisualLinkProps } from '../../../types';
import { Link } from './components/Link';
import { DefaultLink } from './components/Default';

export type LinkContainerProps = {
  elements: {
    [id: string]: ElementView;
  };
  links: {
    [id: string]: LinkView;
  };
  link: LinkView;
  hasArrow: boolean;
  showName: boolean;
  SubComponent?: ComponentType<VisualLinkProps>;
  pendant?: Pendant;
};

const LinkContainer: React.FC<LinkContainerProps> = (props) => {
  const linkName = props.link.state.name;

  const { link } = props;

  const elementFrom = useSelector(
    (state: Store) => state.canvas.view.elements[props.link.state.fromElementId],
  );

  const elementTo = useSelector(
    (state: Store) => state.canvas.view.elements[props.link.state.toElementId],
  );

  const offset = useSelector((state: Store) => state.canvas.view.offset);

  let color = '';

  if (props.link.state.color) {
    color = props.link.state.color;
  } else {
    color = selectRelationColor();
  }

  const onLinkChange = () => {};

  link.state.points = calcPointsBetweenElement(
    props.elements,
    props.links,
    elementFrom,
    elementTo,
    props.link,
    offset,
  );

  return (
    <Link key={props.link.id} link={link}>
      {props.SubComponent && (
        <props.SubComponent
          onLinkChange={onLinkChange}
          link={link}
          pendant={props.pendant}
        />
      )}
      {!props.SubComponent && (
        <DefaultLink
          color={color}
          hasArrow={props.hasArrow}
          showName={props.showName}
          linkName={linkName}
          points={link.state.points}
        />
      )}
    </Link>
  );
};

export default React.memo(LinkContainer);
