export default class MemoryStorageEngine {

  constructor() {
    this.store = {};
  }

  getAllKeys() {
    return new Promise((resolve) => resolve(Object.keys(this.store)));
  }

  getItem(key) {
    return new Promise((resolve) => resolve(this.store[key] || null));
  }

  setItem(key, value) {
    return new Promise((resolve) => {
      this.store[key] = value;
      resolve(true);
    });
  }

  removeItem(key) {
    return new Promise((resolve) => {
      delete this.store[key];
      resolve(true);
    });
  }

  clear() {
    return new Promise((resolve) => {
      this.store = {};
      resolve(true);
    });
  }
}
