import * as common from './common';

describe('Utils', () => {
  it('test assignNewId', () => {
    const object = {};
    expect(common.assignNewId(object)).toEqual({ id: jasmine.any(String) });
  });

  it('test byteSize', () => {
    expect(common.byteSize({})).toEqual(2);
    expect(common.byteSize({ a: 1 })).toEqual(7);
    expect(common.byteSize({ a: 1, b: 2 })).toEqual(13);
    expect(common.byteSize({ a: 1, b: 2, c: 3 })).toEqual(19);
  });

  it('test escapeRegExp', () => {
    expect(common.escapeRegExp('test')).toEqual('test');
    expect(common.escapeRegExp('test.test')).toEqual('test\\.test');
    expect(common.escapeRegExp('test+test')).toEqual('test\\+test');
    expect(common.escapeRegExp('test?test')).toEqual('test\\?test');
    expect(common.escapeRegExp('test*test')).toEqual('test\\*test');
    expect(common.escapeRegExp('test^test')).toEqual('test\\^test');
    expect(common.escapeRegExp('test$test')).toEqual('test\\$test');
    expect(common.escapeRegExp('test{test')).toEqual('test\\{test');
    expect(common.escapeRegExp('test}test')).toEqual('test\\}test');
    expect(common.escapeRegExp('test(test')).toEqual('test\\(test');
    expect(common.escapeRegExp('test)test')).toEqual('test\\)test');
    expect(common.escapeRegExp('test[test')).toEqual('test\\[test');
    expect(common.escapeRegExp('test]test')).toEqual('test\\]test');
    expect(common.escapeRegExp('test|test')).toEqual('test\\|test');
    expect(common.escapeRegExp('test\\test')).toEqual('test\\\\test');
  });

  it('test getLastObjectIdOrNull', () => {
    expect(common.getLastObjectIdOrNull(undefined)).toEqual(null);
    expect(common.getLastObjectIdOrNull([])).toEqual(null);
    expect(common.getLastObjectIdOrNull([{ id: 1 }])).toEqual(1);
    expect(common.getLastObjectIdOrNull([{ id: 1 }, { id: 2 }])).toEqual(2);
    expect(common.getLastObjectIdOrNull([{ id: 'a' }])).toEqual('a');
    expect(common.getLastObjectIdOrNull([{ id: 'a' }, { id: 'b' }])).toEqual(
      'b'
    );
  });

  it('test getOtherOrNull', () => {
    expect(common.getOtherOrNull(undefined, 1)).toEqual(null);
    expect(common.getOtherOrNull([], 1)).toEqual(null);
    expect(common.getOtherOrNull([1], 1)).toEqual(null);
    expect(common.getOtherOrNull([1, 2], 1)).toEqual(2);
    expect(common.getOtherOrNull([1, 2], 2)).toEqual(1);
  });

  it('test getRandomElement', () => {
    const arr = [1, 2, 3, 4, 5];
    const randomElement = common.getRandomElement([1, 2, 3, 4, 5]);
    expect(arr).toContain(randomElement);
  });

  it('test listToDict', () => {
    let idFn = (x: any) => x.toString();
    expect(common.listToDict([], idFn)).toEqual({});
    expect(common.listToDict([1], idFn)).toEqual({ '1': 1 });
    expect(common.listToDict([1, 2], idFn)).toEqual({ '1': 1, '2': 2 });
  });

  it('test range', () => {
    expect(common.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(common.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(common.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(common.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(common.range(0, 10, 3)).toEqual([0, 3, 6, 9]);
    expect(common.range(0, 10, 4)).toEqual([0, 4, 8]);
    expect(common.range(0, 10, 6)).toEqual([0, 6]);
    expect(common.range(0, 10, 7)).toEqual([0, 7]);
    expect(common.range(0, 10, 8)).toEqual([0, 8]);
    expect(common.range(0, 10, 9)).toEqual([0, 9]);
    expect(common.range(0, 10, 10)).toEqual([0]);
    expect(common.range(0, 10, 11)).toEqual([0]);
    expect(common.range(0, 10, 12)).toEqual([0]);
    expect(common.range(0, 10, 13)).toEqual([0]);
    expect(common.range(0, 10, 14)).toEqual([0]);
    expect(common.range(0, 10, 15)).toEqual([0]);
    expect(common.range(0, 10, 16)).toEqual([0]);
    expect(common.range(0, 10, 17)).toEqual([0]);
    expect(common.range(0, 10, 18)).toEqual([0]);
    expect(common.range(0, 10, 19)).toEqual([0]);
    expect(common.range(0, 10, 20)).toEqual([0]);
    expect(common.range(0, 10, 21)).toEqual([0]);
    expect(common.range(0, 10, 22)).toEqual([0]);
    expect(common.range(0, 10, 23)).toEqual([0]);
    expect(common.range(0, 10, 24)).toEqual([0]);
    expect(common.range(0, 10, 25)).toEqual([0]);
    expect(common.range(0, 10, 26)).toEqual([0]);
    expect(common.range(0, 10, 27)).toEqual([0]);
    expect(common.range(0, 10, 28)).toEqual([0]);
  });

  it('test sortComparerById', () => {
    const arr = [
      { id: 'x', name: 'test4' },
      { id: 'a', name: 'test1' },
      { id: 'f', name: 'test5' },
      { id: 'c', name: 'test3' },
      { id: 'z', name: 'test2' },
    ];
    expect(arr.sort(common.sortComparerById)).toEqual([
      { id: 'a', name: 'test1' },
      { id: 'c', name: 'test3' },
      { id: 'f', name: 'test5' },
      { id: 'x', name: 'test4' },
      { id: 'z', name: 'test2' },
    ]);
  });

  it('test sortComparerByName', () => {
    const arr = [
      { id: 'x', name: 'test4' },
      { id: 'a', name: 'test1' },
      { id: 'f', name: 'test5' },
      { id: 'c', name: 'test3' },
      { id: 'z', name: 'test2' },
    ];
    expect(arr.sort(common.sortComparerByName)).toEqual([
      { id: 'a', name: 'test1' },
      { id: 'z', name: 'test2' },
      { id: 'c', name: 'test3' },
      { id: 'x', name: 'test4' },
      { id: 'f', name: 'test5' },
    ]);
  });

  it('test sortUniqNumbers', () => {
    const arr = [2, 1, 2, 3, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4];
    expect(common.sortUniqNumbers(arr)).toEqual(expected);
  });
});
