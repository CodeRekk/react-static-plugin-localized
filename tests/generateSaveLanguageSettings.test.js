import { generateSaveLanguageSettings } from '../src/routeBuilder';

const saveLanguage = {
  id: 'en',
  dataPath: 'data/locales',
};

test('generate save-language from string', () => {
  expect(generateSaveLanguageSettings('en')).toEqual(saveLanguage);
});

test('generate save-language from full', () => {
  expect(
    generateSaveLanguageSettings(saveLanguage),
  ).toEqual(saveLanguage);
});

test('generate save-language from id-only', () => {
  expect(
    generateSaveLanguageSettings({
      id: 'en',
    }),
  ).toEqual(saveLanguage);
});
