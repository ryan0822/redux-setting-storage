const createStorage = require('./lib/storage');
const Actions = require('./lib/actions');
const MemoryStorageEngine = require('./lib/memoryStorageEngine');
const AsyncStorageEngine = require('./lib/asyncStorageEngine');
const NodeLocalStorageEngine = require('./lib/nodeLocalStorageEngine');
const valueSelector = require('./lib/valueSelector');
const isInitialized = require('./lib/isInitialized');

export {
  createStorage,
  Actions,
  valueSelector,
  isInitialized,

  // default engine(use only dev)
  MemoryStorageEngine,

  // react-native
  AsyncStorageEngine,

  // nodejs or eleactron
  NodeLocalStorageEngine
};
