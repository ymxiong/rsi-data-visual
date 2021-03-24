import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { LinkView } from '../logic/link/LinkView';
import { calcPointsBetweenElement } from './utils/calculator';
import Body from './components/Body';
import { selectRelationColor } from '../logic/utils/Color';
import { ElementView, VisualLinkProps } from '../../../types';

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

  const onClick = () => {
    console.log('link on click');
  };

  return (
    <g key={props.link.id} onClick={onClick}>
      <Body
        hasArrow={props.hasArrow}
        color={color}
        points={calcPointsBetweenElement(
          props.elements,
          props.links,
          elementFrom,
          elementTo,
          props.link,
          offset,
        )}
        name={linkName}
        showName={props.showName}
      />
    </g>
  );
};

export default React.memo(LinkContainer);
