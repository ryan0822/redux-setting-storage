# redux-setting-storage

> 설정값을 쉽게 저장할 수 있도록 해주는 redux 기반 라이브러리

## Install
```sh
npm install redux-setting-storage
```

## Usage

```js
// config.settings.js
export default {
  'general.interval': {
    options: [1, 2, 3, 4, 5],
    defaultValue: 1
  },

  'general.name': {
    defaultValue: 'john doe'
  },

  'general.count': {
    options: [1, 2, 3, 4, 5],
    defaultValue: [1, 2]
  },

  '@@version': '1.1.1',
  '@@migration': {
    '1.0.1': (storageData) => { console.log('migration to 1.0.1', storageData); },
    '1.1.1': (storageData) => { console.log('migration to 1.1.1', storageData); }
  }
};
```

```js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import { LocalStorage } from 'node-localstorage';
import {
  NodeLocalStorageEngine,
  createStorage,
  Actions
} from 'redux-setting-storage';

import settingConfiguration from './config.settings';

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
```
