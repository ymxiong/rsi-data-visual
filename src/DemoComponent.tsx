import React from 'react';
import styled from 'styled-components';

const DemoDiv = styled.div`
  font-size: 24px;
`;

const DemoComponent: React.FC = () => {
  return <DemoDiv>demo component</DemoDiv>;
};

export default DemoComponent;
