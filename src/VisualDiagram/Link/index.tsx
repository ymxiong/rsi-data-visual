import React, { ComponentType, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { refreshElement, selectElement } from '../store/canvas/actions';
import { LinkView } from '../logic/link/LinkView';
import { calcPointsBetweenElement } from './utils/calculator';
import { ViewModeProps } from '../../../demo/Task/ViewMode';
import Body from './components/Body';

export type LinkContainerProps = {
  link: LinkView;
};

export const LinkHOC = (
  SubComponent: ComponentType<ViewModeProps>,
): React.FC<LinkContainerProps> => {
  const LinkContainer: React.FC<LinkContainerProps> = (props) => {
    const elementFrom = useSelector(
      (state: Store) => state.canvas.view.elements[props.link.state.fromElementId],
    );

    const elementTo = useSelector(
      (state: Store) => state.canvas.view.elements[props.link.state.toElementId],
    );

    const dispatch = useDispatch();

    return (
      <g key={props.link.id}>
        {/* <SubComponent {...props} /> */}
        <Body
          color={props.link.state.color}
          points={calcPointsBetweenElement(elementFrom, elementTo, props.link)}
        />
      </g>
    );
  };
  return LinkContainer;
};
