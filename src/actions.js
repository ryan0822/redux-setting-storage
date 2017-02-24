import * as Type from './actionTypes';

const saveStorage = (key, data, idx = 0) => (dispatch, getState) => {
  if (key === null && key === undefined && key === '') throw new Error('key must be string.');
  const state = getState();
  if (state['@@storage']['@@initialized'] === true) {
    dispatch({ type: Type.SAVE, payload: { key, data } });
  } else {
    let callCount = idx;
    if (callCount > 20) throw new Error('maximum call stack size exceeded.');
    setTimeout(() => {
      callCount += 1;
      dispatch(saveStorage(key, data, callCount));
    }, 100);
  }
};

export default {
  saveStorage
};
