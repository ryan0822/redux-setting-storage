import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import { LocalStorage } from 'node-localstorage';

import settingConfiguration from './config.settings';

import {
  NodeLocalStorageEngine,
  createStorage,
  Actions
} from '../index';

const logger = createLogger();
const storage = createStorage({
  engine: new NodeLocalStorageEngine(new LocalStorage('./data')),
  configuration: settingConfiguration
});

const middleware = [logger];

const store = createStore(combineReducers({
  ...storage.createReducer()
}), applyMiddleware(...storage.createMiddleware(...middleware)));
storage.applyStorage(store);

store.dispatch(Actions.saveStorage('general.interval', 10));
