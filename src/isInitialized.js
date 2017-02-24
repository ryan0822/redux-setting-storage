const isInitialized = (state) => state['@@storage']['@@initialized'] && !state['@@storage'].data;

export default isInitialized;
