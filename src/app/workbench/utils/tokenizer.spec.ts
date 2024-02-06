import { TokenForDisplay } from '@workbench/interfaces';
import * as tokenizer from './tokenizer';

describe('TokenizerUtils', () => {
  it('test addBoundary', () => {
    const boundaries = [1, 2, 3, 4];
    const expected = [1, 2, 3, 4, 5];
    expect(tokenizer.addBoundary(5, boundaries)).toEqual(expected);
  });

  it('test adjustBoundariesToSpans (conformant: no change)', () => {
    const spans = [
      {
        id: '1',
        start: 0,
        end: 1,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 1], spans);
    expect(boundaries.length).toEqual(2);
    expect(boundaries).toEqual([0, 1]);
  });

  it('test adjustBoundariesToSpans (add start + end)', () => {
    const spans = [
      {
        id: '1',
        start: 1,
        end: 2,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 3], spans);
    expect(boundaries.length).toEqual(4);
    expect(boundaries).toEqual([0, 1, 2, 3]);
  });

  it('test adjustBoundariesToSpans (add end)', () => {
    const spans = [
      {
        id: '1',
        start: 1,
        end: 2,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 1, 3], spans);
    expect(boundaries.length).toEqual(4);
    expect(boundaries).toEqual([0, 1, 2, 3]);
  });

  it('test adjustBoundariesToSpans (add start)', () => {
    const spans = [
      {
        id: '1',
        start: 1,
        end: 2,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 2, 3], spans);
    expect(boundaries.length).toEqual(4);
    expect(boundaries).toEqual([0, 1, 2, 3]);
  });

  it('test adjustBoundariesToSpans (remove boundaries inside)', () => {
    const spans = [
      {
        id: '1',
        start: 1,
        end: 4,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 1, 2, 3, 4], spans);
    expect(boundaries.length).toEqual(3);
    expect(boundaries).toEqual([0, 1, 4]);
  });

  it('test adjustBoundariesToSpans (remove + add boundaries)', () => {
    const spans = [
      {
        id: '1',
        start: 1,
        end: 4,
        labelId: '1',
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];

    let boundaries = tokenizer.adjustBoundariesToSpans([0, 2, 3, 4], spans);
    expect(boundaries.length).toEqual(3);
    expect(boundaries).toEqual([0, 1, 4]);
  });

  it('test createTokenId', () => {
    expect(tokenizer.createTokenId(0, 1)).toEqual('0,1');
  });

  it('test getBoundariesByBytes', () => {
    const text = 'abc';
    const expected = [0, 1, 2, 3];
    expect(tokenizer.getBoundariesByBytes(text)).toEqual(expected);
    expect(text.slice(0, 1)).toEqual('a');
    expect(text.slice(1, 2)).toEqual('b');
    expect(text.slice(2, 3)).toEqual('c');
  });

  it('test getBoundariesBySpace', () => {
    const text = 'set a timer';
    const expected = [0, 3, 4, 5, 6, 11];
    expect(tokenizer.getBoundariesBySpace(text)).toEqual(expected);
    expect(text.slice(0, 3)).toEqual('set');
    expect(text.slice(3, 4)).toEqual(' ');
    expect(text.slice(4, 5)).toEqual('a');
    expect(text.slice(5, 6)).toEqual(' ');
    expect(text.slice(6, 11)).toEqual('timer');
  });

  it('test getCharacters', () => {
    const text = 'hello';
    const expected = ['h', 'e', 'l', 'l', 'o'];
    expect(tokenizer.getCharacters(text)).toEqual(expected);
  });

  it('test getTokensForDisplay', () => {
    const text = 'set a timer';
    const boundaries = [0, 3, 4, 5, 6, 11];
    const expected: TokenForDisplay[] = [
      { id: '0,3', start: 0, end: 3, content: 'set' },
      { id: '3,4', start: 3, end: 4, content: ' ' },
      { id: '4,5', start: 4, end: 5, content: 'a' },
      { id: '5,6', start: 5, end: 6, content: ' ' },
      { id: '6,11', start: 6, end: 11, content: 'timer' },
    ];
    expect(tokenizer.getTokensForDisplay(text, boundaries)).toEqual(expected);
  });

  it('test getTokensForDisplay throws error for empty text', () => {
    expect(() => {
      tokenizer.getTokensForDisplay('', [1, 2, 3]);
    }).toThrow(new Error('Text cannot be empty'));
  });

  it('test getTokensForDisplay throws error for empty boundaries', () => {
    expect(() => {
      tokenizer.getTokensForDisplay('hello', []);
    }).toThrow(new Error('Boundaries cannot be empty'));
  });

  it('test mergeBoundaries', () => {
    const boundaries1 = [1, 2, 3, 4];
    const boundaries2 = [4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(tokenizer.mergeBoundaries(boundaries1, boundaries2)).toEqual(
      expected
    );
  });

  it('test removeBoundary', () => {
    const boundaries = [1, 2, 3, 4];
    const expected = [1, 2, 4];
    expect(tokenizer.removeBoundary(3, boundaries)).toEqual(expected);
  });

  it('test removeBoundary with an invalid boundary', () => {
    expect(() => {
      tokenizer.removeBoundary(4, [1, 2, 3]);
    }).toThrow(new Error('Boundary not found'));
  });

  it('test renderContent', () => {
    const text = 'this is a\ntest';
    const expected = 'this ␠ is ␠ a\\ntest';
    expect(tokenizer.renderContent(text)).toEqual(expected);
  });
});
