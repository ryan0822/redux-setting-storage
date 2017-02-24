const valueSelector = (state, ...keys) => {
  if (keys.length === 0) {
    return state['@@storage'].data;
  } else if (keys.length === 1) {
    return state['@@storage'].data[keys[0]];
  }

  return keys.reduce((p, c) => {
    const obj = p;
    obj[c] = state['@@storage'].data[c];
    return obj;
  }, {});
};

export default valueSelector;
