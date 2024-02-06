import { TestBed } from '@angular/core/testing';

import { TaskTextState, initialTextState } from '@workbench/interfaces';

import * as selectors from './selectors';

describe('TextSelectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test selectBody', () => {
    let state: TaskTextState = {
      ...initialTextState,
      raw_string: 'abc',
    };
    expect(selectors.selectBody.projector(state)).toBe('abc');
  });

  it('test selectBody with empty content', () => {
    expect(selectors.selectBody.projector(initialTextState)).toBe('');
  });

  it('test selectBodyLength', () => {
    let state: TaskTextState = {
      ...initialTextState,
      raw_string: 'abc',
    };
    expect(selectors.selectBodyLength.projector(state)).toBe(3);
  });

  it('test selectBodyLength with empty text', () => {
    expect(selectors.selectBodyLength.projector(initialTextState)).toBe(0);
  });

  it('test selectBodyLengthWithoutSpaces', () => {
    let state: TaskTextState = {
      ...initialTextState,
      raw_string: 'abc e f',
    };
    expect(selectors.selectBodyLengthWithoutSpaces.projector(state)).toBe(5);
  });

  it('test selectBodyLengthWithoutSpaces with empty text', () => {
    expect(
      selectors.selectBodyLengthWithoutSpaces.projector(initialTextState)
    ).toBe(0);
  });

  it('test selectTitle', () => {
    let state: TaskTextState = {
      ...initialTextState,
      name: 'my title',
    };
    expect(selectors.selectTitle.projector(state)).toBe('my title');
  });

  it('test selectTitle with empty content', () => {
    expect(selectors.selectTitle.projector(initialTextState)).toBe(
      'Untitled text'
    );
  });
});
