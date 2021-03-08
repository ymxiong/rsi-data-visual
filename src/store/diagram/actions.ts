import { DiagramAction } from './types';

export const updateId = (id: string): DiagramAction => ({
  type: 'test/test',
  payload: id,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateIdAndxxx = (id: string) => (dispatch, getStore) => {
  const oldId = getStore().diagram.id;

  if (!oldId) {
    return;
  }

  if (id === oldId) {
    dispatch(updateId('1222'));
  } else {
    dispatch(updateId('1122312333'));
  }
};
