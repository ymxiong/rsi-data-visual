import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Demo from '../src';

const Block = styled.div`
  margin: 20px auto;
  padding: 20px;
  border: 10px;
  box-shadow: 0 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 550px;
`;

const App = () => (
  <Block>
    <Demo></Demo>
  </Block>
);

ReactDOM.render(<App></App>, document.getElementById('root'));
