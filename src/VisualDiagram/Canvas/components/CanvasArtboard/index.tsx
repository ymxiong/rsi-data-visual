import styled from 'styled-components';

const CanvasArtboard = styled.div.attrs((props) => {
  const restPercentage = 10;
  return {
    style: {
      transform: 'translate(0px, 0px) scale(1)',
      width: '100%',
      height: '800px',
    },
  };
})`
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      transparent 90%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    linear-gradient(
      90deg,
      transparent 0%,
      transparent 90%,
      rgba(0, 0, 0, 0.2) 100%
    );
  background-size: 10px 10px;
  position: relative;
  transform-origin: 0 0;
  background-color: #fff;
  overflow: hidden;
`;

export { CanvasArtboard };
