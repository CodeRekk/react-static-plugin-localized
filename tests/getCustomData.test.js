import { getCustomData } from '../src/routeBuilder';
import customDataDE from '../example/data/custom/de.json';
import customDataEN from '../example/data/custom/en.json';

const saveCustomConfig = {
  propKey: 'custom',
  dataPath: 'example/data/custom',
};

test('getCustomDataDE', () => {
  expect(getCustomData(saveCustomConfig, { id: 'de' })).toEqual(
    { custom: customDataDE },
  );
});

test('getCustomDataEN', () => {
  expect(getCustomData(saveCustomConfig, { id: 'en' })).toEqual(
    { custom: customDataEN },
  );
});
