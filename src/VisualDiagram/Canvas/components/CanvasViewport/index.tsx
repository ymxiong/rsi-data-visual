import styled from 'styled-components';

const CanvasViewport = styled.div`
  min-height: 600px;
  flex: 1 0 auto;
  overflow: hidden;
  background: #eee;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  & * {
    box-sizing: border-box;
  }
  & ul,
  & ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

export default CanvasViewport;
