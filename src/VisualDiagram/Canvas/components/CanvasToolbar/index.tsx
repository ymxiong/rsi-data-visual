import React from 'react';
import { useSelector } from '../../../store/hooks';
import { Store } from '../../../store';

import styled from 'styled-components';
import { buildElementComponents } from './buildComponents';

const ToolbarStyle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 15px;
  width: 60px;
  height: 90%;
  margin: auto;
  padding: 20px 5px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
`;

export interface CanvasToolbarProps {
  hide?: boolean;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({ hide }) => {
  const toolbar = useSelector((state: Store) => state.diagram.toolbar);

  const toolbarShowItems = useSelector(
    (state: Store) => state.diagram.toolbarShowItems,
  );

  const styles: JSX.Element[] = buildElementComponents(
    toolbarShowItems,
    toolbar,
  );

  return (
    <ToolbarStyle style={{ transform: hide ? 'translateX(-140%)' : 'unset' }}>
      {styles.map((style) => style)}
    </ToolbarStyle>
  );
};

export default CanvasToolbar;
