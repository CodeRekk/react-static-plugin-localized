import _ from 'lodash';
import { getAllRoutesWithData } from '../src/routeBuilder';
import Input from './assets/input.json';
import Output from './assets/output';

const functionResult = getAllRoutesWithData(Input);
const expectedResult = Output;

/* eslint no-param-reassign: 0 */
_.map(functionResult, (result, index) => {
  test('getAllRoutesWithData getData', () => {
    expect(result.getData()).toEqual(expectedResult[index].getData());
  });

  if (result.children) {
    _.map(result.children, (child, childIndex) => {
      test('getAllRoutesWithData children getData', () => {
        expect(child.getData()).toEqual(expectedResult[index].children[childIndex].getData());
      });

      test('getAllRoutesWithData children', () => {
        delete child.getData;
        delete expectedResult[index].children[childIndex].getData;
        expect(child).toEqual(expectedResult[index].children[childIndex]);
      });
    });
  }

  test('getAllRoutesWithData', () => {
    delete result.getData;
    delete result.children;
    delete expectedResult[index].getData;
    delete expectedResult[index].children;
    expect(result).toEqual(expectedResult[index]);
  });
});
/* eslint no-param-reassign: 1 */
