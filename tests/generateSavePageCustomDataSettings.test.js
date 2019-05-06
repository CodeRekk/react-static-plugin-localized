import { generateSavePageCustomDataSettings } from '../src/routeBuilder';

const saveCustomData = {
  propKey: 'posts',
  dataPath: 'data/stories',
};

test('generate save-customData from full', () => {
  expect(generateSavePageCustomDataSettings(saveCustomData)).toEqual(
    saveCustomData,
  );
});

test('generate save-customData from without propKey', () => {
  expect(
    generateSavePageCustomDataSettings({ dataPath: 'data/stories' }),
  ).toEqual({ ...saveCustomData, propKey: 'data' });
});
