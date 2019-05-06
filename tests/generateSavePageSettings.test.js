import { generateSavePageSettings } from '../src/routeBuilder';

const savePage = {
  id: 'about',
  path: '/about',
  templateFile: 'src/pages/about',
  translationKey: 'about',
  children: null,
  customData: null,
};

test('generate save-page from string', () => {
  expect(generateSavePageSettings('about')).toEqual(savePage);
});

test('generate save-page from full', () => {
  expect(generateSavePageSettings(savePage)).toEqual(savePage);
});

test('generate save-page from without translationKey', () => {
  expect(
    generateSavePageSettings({
      id: 'about',
      path: '/about',
      templateFile: 'src/pages/about',
    }),
  ).toEqual(savePage);
});

test('generate save-page from without translationKey, templateFile', () => {
  expect(
    generateSavePageSettings({
      id: 'about',
      path: '/about',
    }),
  ).toEqual(savePage);
});

test('generate save-page from with id only', () => {
  expect(
    generateSavePageSettings({
      id: 'about',
    }),
  ).toEqual(savePage);
});
