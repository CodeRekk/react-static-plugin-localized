import { getRoutePathWithLanguage } from '../src/routeBuilder';

test('get index route for default language', () => {
  expect(getRoutePathWithLanguage('/', 'en', 'en')).toBe('/');
});

test('get index route for non-default language', () => {
  expect(getRoutePathWithLanguage('/', 'cs', 'en')).toBe('cs/');
});
