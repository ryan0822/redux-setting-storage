export default class AsyncStorageEngine {
  constructor(storage) {
    this.storage = storage;
  }
  getAllKeys() {
    return new Promise((resolve, reject) => {
      this.storage.getAllKeys((error, keys) => {
        if (error) {
          reject(error);
        } else {
          resolve(keys);
        }
      });
    });
  }

  getItem(key) {
    return new Promise((resolve, reject) => {
      this.storage.getItem(key, (error, item) => {
        if (error) {
          reject(error);
        } else {
          resolve(item);
        }
      });
    });
  }

  setItem(key, value) {
    return new Promise((resolve, reject) => {
      this.storage.setItem(key, value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  removeItem(key) {
    return new Promise((resolve, reject) => {
      this.storage.removeItem(key, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.storage.clear((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}
