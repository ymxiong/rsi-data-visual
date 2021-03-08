import style from 'styled-components';

const CanvasOuterDiv = style.div.attrs({
  style: (props: any) => {
    const defaultStyles = {
      // width: ` ${props.artboard.width + props.artboard.x}px`,
      height: `${props.artboard.height + props.artboard.y}px`,
    };
    return defaultStyles;
  },
})`
width: 100%;
`;

export { CanvasOuterDiv };
