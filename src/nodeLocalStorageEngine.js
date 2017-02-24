export default class NodeLocalStorageEngine {

  constructor(store) {
    this.store = store;
  }

  getAllKeys() {
    return new Promise((resolve) => {
      const { store } = this;
      const keys = [];
      for (let i = 0, len = store.length; i < len; i += 1) {
        keys.push(store.key(i));
      }
      resolve(keys);
    });
  }

  getItem(key) {
    return new Promise((resolve) => resolve(this.store.getItem(key) || null));
  }

  setItem(key, value) {
    return new Promise((resolve) => {
      this.store.setItem(key, value);
      resolve(true);
    });
  }

  removeItem(key) {
    return new Promise((resolve) => {
      this.store.removeItem(key);
      resolve(true);
    });
  }

  clear() {
    return new Promise((resolve) => {
      this.store.clear();
      resolve(true);
    });
  }
}
