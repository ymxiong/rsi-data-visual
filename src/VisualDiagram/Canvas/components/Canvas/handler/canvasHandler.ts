import { Dispatch } from '../../../../logic/utils/Dispatch';
import { refreshCanvasScale } from '../../../../store/canvas/actions';
import { zoomLevels } from '../../../../logic/utils/Scale';

export const onCanvasZoomIn = (
  dispatch: Dispatch,
  canvasScale: number,
): void => {
  let scale = canvasScale;
  if (scale > zoomLevels.length - 2) {
    scale = zoomLevels.length - 1;
  } else {
    scale += 1;
  }
  dispatch(refreshCanvasScale(scale));
};

export const onCanvasZoomOut = (
  dispatch: Dispatch,
  canvasScale: number,
): void => {
  let scale = canvasScale;
  if (scale < 1) {
    scale = 0;
  } else {
    scale -= 1;
  }
  dispatch(refreshCanvasScale(scale));
};
