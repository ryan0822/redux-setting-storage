const executeMigration = (executor, storageVersion, data) => (
  Object.keys(executor)
    .sort()
    .filter(key => storageVersion < key)
    .reduce((p, c) => {
      const tmp = executor[c](p);
      return tmp || p;
    }, data)
);

const migrateStorage = (result, configuration) => {
  if (!configuration || !configuration['@@version']) {
    return Promise.resolve({ result: result.data || {}, changed: false });
  }

  const storageVersion = result['@@version'];
  const configVersion = configuration['@@version'];
  const changed = storageVersion !== configVersion;
  if (!changed) {
    return Promise.resolve({ result: result.data, changed });
  }

  return new Promise((resolve, reject) => {
    try {
      const mergedData = Object.keys(configuration).reduce((d, k) => {
        const tmp = d;
        if (!/^@@/.test(k) && !tmp[k]) {
          let defaultValue = configuration[k].defaultValue;
          if (defaultValue === undefined) defaultValue = null;
          tmp[k] = defaultValue;
        }

        return tmp;
      }, result.data || {});

      resolve({
        result: executeMigration(configuration['@@migration'], storageVersion, mergedData),
        changed
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default migrateStorage;
