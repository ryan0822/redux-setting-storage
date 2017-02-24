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

  'general.display': {
    options: [true, false],
    defaultValue: false
  },

  '@@version': '1.1.1',
  '@@migration': {
    '1.0.1': (storageData) => { console.log('migration to 1.0.1', storageData); },
    '1.1.1': (storageData) => { console.log('migration to 1.1.1', storageData); }
  }
};
