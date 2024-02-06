import { Dictionary } from '@ngrx/entity';

import { Label } from '@app/interfaces';
import {
  ElementForDisplay,
  Error,
  Span,
  SpanForDisplay,
  SpanSource,
  SpanStatus,
  TokenForDisplay,
  ValidationResult,
} from '@workbench/interfaces';

import { listToDict } from './common';
import { adjustBoundariesToSpans, getTokensForDisplay } from './tokenizer';

export const labelColors: string[] = [
  '#F0CDED', // Thistle
  '#C7FAF6', // Celeste
  '#FFC2C4', // Tea rose (red)
  '#DAD7EA', // Lavender (web)
  '#F9E6C8', // Champagne
  '#F8CAB4', // Apricot
  '#FAF3C6', // Lemon chiffon
  '#C5E0FB', // Columbia blue
  '#E9D8E3', // Pale purple
  '#BAE4F3', // Light blue
  '#97EDD3', // Aquamarine
  '#E6E2DB', // Alabaster
  '#D5F2CF', // Tea green
  '#AEE18E', // Light green
  '#FBC1B1', // Melon
];

/** Create the span ID.
 *
 * Notes:
 *   - The span ID is a string with the format "start,end", e.g. "1,4".
 *   - It is used as the key in the dictionary of spans.
 *   - It is only unique within each annotation layer.
 *
 * @param start Start index of the span.
 * @param end End index of the span.
 * @returns The span ID.
 * */
export function createSpanId(start: number, end: number): number {
  // TODO(gustavoauma): Fix this.
  return -start;
}

/** Create a span.
 * @param start Start index of the span.
 * @param end End index of the span.
 * @param labelId Label ID of the span.
 * @returns Span.
 * */
export function createSpan(
  start: number,
  end: number,
  labelId: number,
  source: SpanSource = SpanSource.Manual,
  status: SpanStatus = SpanStatus.Accepted
): Span {
  return {
    id: createSpanId(start, end),
    start,
    end,
    label: labelId,
    source,
    status,
    created: new Date(),
  };
}

/** Returns the spans for display.
 * @param text Text to display.
 * @param spans Spans to display.
 * @param labelEntities Label entities.
 * @returns Spans for display.
 * */
export function getSpansForDisplay(
  text: string,
  spans: Span[],
  labelEntities: Dictionary<Label>
): SpanForDisplay[] {
  return spans.map((span) => {
    return <SpanForDisplay>{
      ...span,
      labelContent: labelEntities[span.label!]?.name,
      content: text.substring(span.start, span.end),
      color: labelEntities[span.label!]?.color,
    };
  });
}

/** Returns the spans for display.
 * @param text Text to display.
 * @param spans Spans to display.
 * @param labelEntities Label entities.
 * @returns Spans for display.
 * */
export function getSpansForDisplayDict(
  text: string,
  spans: Span[],
  labelEntities: Dictionary<Label>
): Dictionary<SpanForDisplay> {
  let spansForDisplay = getSpansForDisplay(text, spans, labelEntities);
  // Use a fake ID for the dictionary, instead of the actual Span ID in the DB.
  return listToDict(spansForDisplay, (span: SpanForDisplay) =>
    [span.start, span.end].join(',')
  );
}

/**
 * Returns the spans or tokens to be displayed in the annotations tab.
 * @param text Text to display.
 * @param boundaries Boundaries of the text.
 * @param labelEntities Label entities.
 * @param spans Array of spans.
 * @returns Spans or tokens for display.
 */
export function getElementsForDisplay(
  text: string,
  boundaries: number[],
  labelEntities: Dictionary<Label>,
  spans: Span[]
): ElementForDisplay[] {
  let output: ElementForDisplay[] = [];

  if (text.length == 0) {
    throw Error('Text cannot be empty');
  }

  if (boundaries.length == 0) {
    throw Error('Boundaries cannot be empty');
  }

  if (Object.keys(labelEntities).length == 0) {
    throw Error('Label entities cannot be empty');
  }

  // Replace TokenForDisplay by SpanForDisplay if they have the same start and end.
  //
  // Note: adjustedBoundaries guarantees that the we will produce non-overlapping
  // tokens and spans, as any boundaries that are within the span are removed. Then
  // we can just generate the TokenForDisplay items and replace them by the
  // SpanForDisplay items whenever applicable.
  const adjustedBoundaries = adjustBoundariesToSpans(boundaries, spans);
  const tokensForDisplay = getTokensForDisplay(text, adjustedBoundaries);
  const spansForDisplayDict = getSpansForDisplayDict(
    text,
    spans,
    labelEntities
  );
  tokensForDisplay.forEach((token: TokenForDisplay) => {
    if (token.id in spansForDisplayDict) {
      output.push(spansForDisplayDict[token.id]!);
    } else {
      output.push(token);
    }
  });
  return output;
}

/**
 * Returns the ValidationResult for the Span (in isolation).
 * @param span Input span to be validated.
 * @returns ValidationResult.
 */
export function validateSpan(span: Span): ValidationResult {
  let errors = <Error[]>[];
  if (span.id == null || span.id == null) {
    errors.push(<Error>{
      message: 'ID cannot be empty',
      type: 'empty-id',
    });
  }
  if (span.label == null || span.label == null) {
    errors.push(<Error>{
      message: 'Label ID cannot be empty',
      type: 'empty-label-id',
    });
  }
  if (span.start < 0) {
    errors.push(<Error>{
      message: 'Start index cannot be negative',
      type: 'negative-start',
    });
  }
  if (span.end < 0) {
    errors.push(<Error>{
      message: 'End index cannot be negative',
      type: 'negative-end',
    });
  }
  if (span.start >= span.end) {
    errors.push(<Error>{
      message: 'End index must be greater than start',
      type: 'invalid-range',
    });
  }
  return {
    isValid: errors.length == 0,
    errors: errors,
  };
}

/**
 * Returns the ValidationResult for the Span (in context).
 * @param span Input span to be validated.
 * @param spans Array of existing spans.
 * @returns ValidationResult.
 */
export function validateSpanInContext(
  span: Span,
  spans: Span[]
): ValidationResult {
  let errors = <Error[]>[];
  // Validate the span in isolation.
  const validationResult = validateSpan(span);
  if (!isValid(validationResult)) {
    return validationResult;
  }
  // Check for span overlap.
  if (
    spans.find(
      (s) =>
        // new span is contained within old span
        // e.g. (0, 1) vs. (0, 3)
        (span.start >= s.start && span.start < s.end) ||
        (span.end > s.start && span.end <= s.end) ||
        // new span contains old span
        // e.g. (0, 1) vs. (0, 3)
        (s.start >= span.start && s.start < span.end) ||
        (s.end > span.start && s.end <= span.end)
    )
  ) {
    errors.push(<Error>{
      message: 'Span overlaps with another span',
      type: 'overlap',
    });
  }

  return {
    isValid: errors.length == 0,
    errors: errors,
  };
}

export function isValid(result: ValidationResult): boolean {
  return result.isValid;
}

/** Sort a list of spans.
 * @param spans List of spans.
 * @returns Sorted list of spans.
 * */
export function sortSpans(spans: Span[]): Span[] {
  return [...new Set(spans)].sort(function (a, b) {
    return a.start - b.start || a.end - b.end;
  });
}
