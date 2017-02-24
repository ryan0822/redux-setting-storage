import thunk from 'redux-thunk';
import MemoryStorageEngine from './memoryStorageEngine';
import * as Type from './actionTypes';
import migrateStorage from './migration';

const createStorage = ({ engine, name = 'storage', configuration } = {}) => {
  const s = engine || new MemoryStorageEngine();
  const initializeState = {
    '@@initialized': false,
    data: null
  };

  const behaviors = {
    [Type.INIT](state, { payload: storedData = {} }) {
      return Object.assign({}, initializeState, { '@@initialized': true }, { data: storedData });
    },

    [Type.SAVE](state, { payload: { key, data } }) {
      const storageData = Object.assign({}, state, {
        data: Object.assign({}, state.data, { [key]: data })
      });

      if (configuration && configuration['@@version']) {
        storageData['@@version'] = configuration['@@version'];
      } else {
        storageData['@@version'] = '0';
      }
      s.setItem(name, JSON.stringify(storageData));
      return storageData;
    }
  };

  return {
    createReducer: () => ({
      '@@storage': (state = initializeState, action) => {
        const behavior = behaviors[action.type];
        return behavior ? behavior(state, action) : state;
      },
      '@@storage.configuration': () => configuration || {}
    }),

    createMiddleware: (...args) => (
      (args || []).filter(arg => arg === thunk).length === 0 ? [thunk].concat(args) : args
    ),

    applyStorage: (store) => {
      store.dispatch(dispatch => {
        s.getItem(name).then((data) => {
          const result = data ? JSON.parse(data) : {};
          return migrateStorage(result, configuration);
        })
        .then(({ result, changed }) => {
          if (changed) {
            return s.setItem(name, JSON.stringify({ '@@version': configuration['@@version'], data: result })).then(() => result);
          }
          return result;
        })
        .then(result => dispatch({ type: Type.INIT, payload: result }))
        .catch(console.error);
      });
    }
  };
};

export default createStorage;
