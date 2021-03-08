import style from 'styled-components';

const CanvasViewport = style.div`
  min-height: 50em;
  flex: 1 0 auto;
  position: relative;
  overflow: hidden;
  background: #eee;

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
