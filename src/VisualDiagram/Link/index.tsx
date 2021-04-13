import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { LinkView } from '../logic/link/LinkView';
import { calcPointsBetweenElement } from './utils/calculator';
import { selectRelationColor } from '../logic/utils/Color';
import { ElementView, VisualLinkProps } from '../../../types';
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
};

const LinkContainer: React.FC<LinkContainerProps> = (props) => {
  const dispatch = useDispatch();

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
        <props.SubComponent onLinkChange={onLinkChange} link={link} />
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
