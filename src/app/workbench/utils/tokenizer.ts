import { Span, TokenForDisplay } from '@workbench/interfaces';
import { range, sortUniqNumbers } from './common';

export function addBoundary(boundary: number, boundaries: number[]): number[] {
  boundaries.push(boundary);
  return sortUniqNumbers(boundaries);
}

/**
 * Adjust boundaries and ensure that they are valid according to spans.
 *
 * This ensures no boundaries are missing and also that no boundaries fall
 * between the start and end of the span.
 *
 * @param boundaries Boundaries to adjust.
 * @param spans Spans to use for adjustment.
 * @returns Adjusted boundaries.
 */
export function adjustBoundariesToSpans(boundaries: number[], spans: Span[]) {
  const newBoundaries = [...boundaries];
  spans.forEach((span) => {
    // Ensure no boundaries are missing.
    if (!newBoundaries.includes(span.start)) {
      newBoundaries.push(span.start);
    }
    if (!newBoundaries.includes(span.end)) {
      newBoundaries.push(span.end);
    }
    // Remove boundaries that fall between the start and end of the span.
    const boundariesToRemove = range(span.start, span.end);
    boundariesToRemove.forEach((boundary) => {
      if (
        boundary != span.start &&
        boundary != span.end &&
        newBoundaries.includes(boundary)
      ) {
        const index = newBoundaries.indexOf(boundary);
        if (index > -1) {
          newBoundaries.splice(index, 1);
        }
      }
    });
  });
  return sortUniqNumbers(newBoundaries);
}

/** Create the token ID.
 *
 * Notes:
 *   - The token ID is a string with the format "start,end", e.g. "1,4".
 *   - It is used as the key in the dictionary of tokens.
 *
 * @param start Start index of the span.
 * @param end End index of the span.
 * @returns The span ID.
 * */
export function createTokenId(start: number, end: number): string {
  return `${start},${end}`;
}

export function getCharacters(text: string): string[] {
  return [...text];
}

/**
 * Get boundaries by bytes.
 *
 * A couple remarks on how we define boundaries:
 *  1) Boundaries are at the start of a character.
 *  2) The zeroth index (i.e. 0) is always included.
 *  3) The end index (i.e. text.length+1) is always included.
 *
 * @param text Text to get boundaries for.
 * @returns Boundaries
 * @example
 * getBoundariesByBytes('abc') -> [0, 1, 2, 3]
 */
export function getBoundariesByBytes(text: string): number[] {
  return [...Array(text.length).keys(), text.length];
}

/**
 * Get boundaries by space.
 *
 * A couple remarks on how we define boundaries:
 *  1) Boundaries are at the start of a character.
 *  2) The zeroth index (i.e. 0) is always included.
 *  3) The end index (i.e. text.length+1) is always included.
 *
 * @param text Text to get boundaries for.
 * @returns Boundaries.
 * @example
 * getBoundariesBySpace('set a timer') -> [0, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export function getBoundariesBySpace(text: string): number[] {
  let boundaries: number[] = [0];
  var regexp = /[\s,.]/g;
  let matches = [...text.matchAll(regexp)];
  matches.forEach((match) => {
    if (match.index) {
      // Push the start index of the character.
      // e.g. "set*|* |a*|* |timer" -> [3, 4, 5, 6]
      boundaries.push(match.index);

      // Push the end index of the character, if not last.
      if (match.index != text.length) {
        boundaries.push(match.index + 1);
      }
    }
  });
  // Push the end index of the text.
  boundaries.push(text.length);
  return boundaries;
}

export function getTokensForDisplay(
  text: string,
  boundaries: number[]
): TokenForDisplay[] {
  if (text.length == 0) {
    throw Error('Text cannot be empty');
  }

  if (boundaries.length == 0) {
    throw Error('Boundaries cannot be empty');
  }

  let tokens: TokenForDisplay[] = [];
  for (let i = 1; i < boundaries.length; i++) {
    tokens.push({
      id: createTokenId(boundaries[i - 1], boundaries[i]),
      start: boundaries[i - 1],
      end: boundaries[i],
      content: text.slice(boundaries[i - 1], boundaries[i]),
    });
  }
  return tokens;
}

export function isLineBreakCh(ch: string): boolean {
  return ch == '\n';
}

export function isSpecialCh(ch: string): boolean {
  return [' ', '\n'].includes(ch);
}

export function mergeBoundaries(
  boundaries1: number[],
  boundaries2: number[]
): number[] {
  return sortUniqNumbers([...new Set(boundaries1.concat(boundaries2))]);
}

export function removeBoundary(
  boundary: number,
  boundaries: number[]
): number[] {
  let idx = boundaries.indexOf(boundary);
  if (idx == -1) {
    throw Error('Boundary not found');
  }
  boundaries.splice(idx, 1);
  return boundaries;
}

export function renderCh(ch: string): string {
  switch (ch) {
    case ' ':
      return ' ␠ ';
    case '\n':
      return '\\n';
    case '\r':
      return '\\r';
    default:
      return ch;
  }
}

export function renderContent(content: string): string {
  let newContent: string = '';
  for (var i = 0; i < content.length; i++) {
    newContent += renderCh(content[i]);
  }
  return newContent;
}
