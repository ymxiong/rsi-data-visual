import { Point } from '../../../logic/utils/Point';
import { Size } from '../../../logic/utils/Size';
import styled from 'styled-components';

type CanvasArtboardProps = {
  scale: number;
  size: Size;
  offset: Point;
  gridSize?: number;
};

const CanvasArtboard = styled.div.attrs((props: CanvasArtboardProps) => {
  return {
    style: {
      transform: `translate(${props.offset.x * props.scale}px, ${
        props.offset.y * props.scale
      }px) scale(${props.scale})`,
      width: `${props.size.width}px`,
      height: `${props.size.height}px`,
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
