import styled from 'styled-components';

type CanvasArtboardProps = {
  offsetX: number;
  offsetY: number;
  scale: number;
  width: number;
  height: number;
};

const CanvasArtboard = styled.div.attrs((props: CanvasArtboardProps) => {
  return {
    style: {
      transform: `translate(${props.offsetX * props.scale}px, ${
        props.offsetY * props.scale
      }px) scale(${props.scale})`,
      width: `${props.width}px`,
      height: `${props.height}px`,
    },
  };
})`
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      transparent 95%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    linear-gradient(
      90deg,
      transparent 0%,
      transparent 95%,
      rgba(0, 0, 0, 0.1) 100%
    );
  background-size: 25px 25px;
  position: relative;
  transform-origin: 0 0;
  background-color: #fff;
  overflow: hidden;
`;

export { CanvasArtboard, CanvasArtboardProps };
