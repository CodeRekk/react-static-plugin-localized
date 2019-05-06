import { generateSavePageChildrenSettings } from '../src/routeBuilder';

const saveChildren = {
  path: '/post',
  urlKeyPath: 'id',
  templateFile: 'src/containers/Post',
  propKey: 'post',
  dataPath: 'data/stories',
};

test('generate save-children from full', () => {
  expect(generateSavePageChildrenSettings(saveChildren)).toEqual(saveChildren);
});

test('generate save-children from without propKey', () => {
  expect(
    generateSavePageChildrenSettings({
      path: '/post',
      urlKeyPath: 'id',
      templateFile: 'src/containers/Post',
      dataPath: 'data/stories',
    }),
  ).toEqual({ ...saveChildren, propKey: 'data' });
});

test('generate save-children from without urlKeyPath', () => {
  expect(
    generateSavePageChildrenSettings({
      path: '/post',
      templateFile: 'src/containers/Post',
      propKey: 'post',
      dataPath: 'data/stories',
    }),
  ).toEqual(saveChildren);
});
