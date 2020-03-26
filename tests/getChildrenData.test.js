import fp from 'lodash/fp';
import { getChildrenData } from '../src/routeBuilder';
import childrenDataDE from '../example/data/custom/de.json';
import childrenDataEN from '../example/data/custom/en.json';

const saveChildrenConfig = {
  path: '/post',
  urlKeyPath: 'id',
  templateFile: 'src/container/Post',
  propKey: 'post',
  dataPath: 'example/data/custom',
};

const deChildrenResult = getChildrenData(saveChildrenConfig, { id: 'de' }, 'stories');
const enChildrenResult = getChildrenData(saveChildrenConfig, { id: 'en' }, 'stories');

test('getChildrenDataDE', () => {
  for (let i = 0; i < deChildrenResult.length; i += 1) {
    const deChild = deChildrenResult[i];
    expect(deChild.path).toBe(`/post/${fp.get([i, 'id'], childrenDataDE)}`);
    expect(deChild.template).toBe(saveChildrenConfig.templateFile);
    expect(deChild.getData()).toEqual({
      location: `stories/post/${fp.get([i, 'id'], childrenDataDE)}`,
      locale: 'de',
      post: childrenDataDE[i],
    });
  }
});

test('getChildrenDataEN', () => {
  for (let i = 0; i < enChildrenResult.length; i += 1) {
    const enChild = enChildrenResult[i];
    expect(enChild.path).toBe(`/post/${fp.get([i, 'id'], childrenDataEN)}`);
    expect(enChild.template).toBe(saveChildrenConfig.templateFile);
    expect(enChild.getData()).toEqual({
      location: `stories/post/${fp.get([i, 'id'], childrenDataEN)}`,
      locale: 'en',
      post: childrenDataEN[i],
    });
  }
});
