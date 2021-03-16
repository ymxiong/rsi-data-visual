import React, { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshElement, selectElement } from '../store/canvas/actions';
import { LinkView } from '../logic/link/LinkView';
import { calcPointsBetweenElement } from './utils/calculator';
import Body from './components/Body';
import { selectRelationColor } from '../logic/utils/Color';

export type LinkContainerProps = {
  link: LinkView;
  SubComponent: ComponentType<any>;
};

export const LinkContainer: React.FC<LinkContainerProps> = (props) => {
  const dispatch = useDispatch();

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

  return (
    <g key={props.link.id}>
      <Body
        color={color}
        points={calcPointsBetweenElement(
          elementFrom,
          elementTo,
          props.link,
          offset,
        )}
      />
    </g>
  );
};
