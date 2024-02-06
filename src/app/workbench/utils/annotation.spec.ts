import { Dictionary } from '@ngrx/entity';

import { Label } from '@app/interfaces';
import {
  Span,
  SpanForDisplay,
  SpanSource,
  SpanStatus,
  TokenForDisplay,
  ValidationResult,
} from '@workbench/interfaces';

import * as annotation from './annotation';

const OVERLAPPING_SPAN_RESULT = <ValidationResult>{
  isValid: false,
  errors: [{ message: 'Span overlaps with another span', type: 'overlap' }],
};

describe('AnnotationUtils', () => {
  it('test createSpan', () => {
    let span1 = annotation.createSpan(0, 1, '1');
    let span2 = annotation.createSpan(0, 2, '1');
    let span3 = annotation.createSpan(1, 3, '1');

    let sortedSpans = annotation.sortSpans([span2, span1, span3]);
    expect(sortedSpans.length).toEqual(3);
    expect(sortedSpans[0]).toEqual(span1);
    expect(sortedSpans[1]).toEqual(span2);
    expect(sortedSpans[2]).toEqual(span3);
  });

  it('test createSpanId', () => {
    expect(annotation.createSpanId(0, 1)).toEqual('0,1');
  });

  it('test getElementsForDisplay', () => {
    let spans: Span[] = [
      {
        id: '1,2',
        start: 1,
        end: 2,
        label: 'label1',
        source: SpanSource.Manual,
        status: SpanStatus.Accepted,
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];
    let labelEntities: Dictionary<Label> = {
      label1: {
        id: 'label1',
        name: 'label 1',
        value: 'LABEL_1',
        color: '#fff',
      },
    };

    let tokensOrSpans = annotation.getElementsForDisplay(
      'abc',
      [0, 1, 2, 3],
      labelEntities,
      spans
    );
    expect(tokensOrSpans.length).toEqual(3);
    expect(tokensOrSpans[0]).toEqual(<TokenForDisplay>{
      id: '0,1',
      start: 0,
      end: 1,
      content: 'a',
    });
    expect(tokensOrSpans[1]).toEqual(<SpanForDisplay>{
      id: '1,2',
      start: 1,
      end: 2,
      label: 'label1',
      labelContent: 'label 1',
      content: 'b',
      source: SpanSource.Manual,
      status: SpanStatus.Accepted,
      color: '#fff',
      created: new Date('2023-06-14T19:53:11.864Z'),
    });
    expect(tokensOrSpans[2]).toEqual({
      id: '2,3',
      start: 2,
      end: 3,
      content: 'c',
    });
  });

  it('test getSpansForDisplay', () => {
    let spans: Span[] = [
      {
        id: '1,2',
        start: 1,
        end: 2,
        label: 'label1',
        source: SpanSource.Manual,
        status: SpanStatus.Accepted,
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];
    let labelEntities: Dictionary<Label> = {
      label1: {
        id: 'label1',
        name: 'label 1',
        value: 'LABEL_1',
        color: '#fff',
      },
    };
    let spansForDisplay = annotation.getSpansForDisplay(
      'abc',
      spans,
      labelEntities
    );
    expect(spansForDisplay.length).toEqual(1);
    expect(spansForDisplay[0]).toEqual(<SpanForDisplay>{
      id: '1,2',
      start: 1,
      end: 2,
      label: 'label1',
      labelContent: 'label 1',
      content: 'b',
      source: SpanSource.Manual,
      status: SpanStatus.Accepted,
      color: '#fff',
      created: new Date('2023-06-14T19:53:11.864Z'),
    });
  });

  it('test getSpansForDisplayDict', () => {
    let spans: Span[] = [
      {
        id: '1,2',
        start: 1,
        end: 2,
        label: 'label1',
        source: SpanSource.Manual,
        status: SpanStatus.Accepted,
        created: new Date('2023-06-14T19:53:11.864Z'),
      },
    ];
    let labelEntities: Dictionary<Label> = {
      label1: {
        id: 'label1',
        name: 'label 1',
        value: 'LABEL_1',
        color: '#fff',
      },
    };
    let spansForDisplay = annotation.getSpansForDisplayDict(
      'abc',
      spans,
      labelEntities
    );
    expect(Object.keys(spansForDisplay).length).toEqual(1);
    expect(spansForDisplay['1,2']).toEqual(<SpanForDisplay>{
      id: '1,2',
      start: 1,
      end: 2,
      label: 'label1',
      labelContent: 'label 1',
      content: 'b',
      source: SpanSource.Manual,
      status: SpanStatus.Accepted,
      color: '#fff',
      created: new Date('2023-06-14T19:53:11.864Z'),
    });
  });

  it('test validateSpan with a valid span', () => {
    let span = <Span>{
      id: -1,
      start: 0,
      end: 3,
      label: 'label1',
      source: SpanSource.Manual,
      status: SpanStatus.Accepted,
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({ isValid: true, errors: [] });
  });

  it('test validateSpan with an invalid span (empty-id)', () => {
    let span = <Span>{
      id: -1,
      start: 0,
      end: 1,
      label: 'label1',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [{ message: 'ID cannot be empty', type: 'empty-id' }],
    });
  });

  it('test validateSpan with an invalid span (empty-label-id)', () => {
    let span = <Span>{
      id: 'span0',
      start: 0,
      end: 1,
      label: '',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [{ message: 'Label ID cannot be empty', type: 'empty-label-id' }],
    });
  });

  it('test validateSpan with an invalid span (negative-start)', () => {
    let span = <Span>{
      id: 'span0',
      start: -1,
      end: 1,
      label: 'label1',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [
        { message: 'Start index cannot be negative', type: 'negative-start' },
      ],
    });
  });

  it('test validateSpan with an invalid span (negative-end)', () => {
    let span = <Span>{
      id: 'span0',
      start: 0,
      end: -1,
      label: 'label1',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [
        { message: 'End index cannot be negative', type: 'negative-end' },
        // invalid-range is expected here as 0 > -3.
        {
          message: 'End index must be greater than start',
          type: 'invalid-range',
        },
      ],
    });
  });

  it('test validateSpan with an invalid span (invalid-range)', () => {
    let span = <Span>{
      id: 'span0',
      start: 1,
      end: 0,
      label: 'label1',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [
        {
          message: 'End index must be greater than start',
          type: 'invalid-range',
        },
      ],
    });
  });

  it('test validateSpan with an invalid span (invalid-range: zero)', () => {
    let span = <Span>{
      id: 'span0',
      start: 1,
      end: 0,
      label: 'label1',
    };
    let result = annotation.validateSpan(span);
    expect(result).toEqual({
      isValid: false,
      errors: [
        {
          message: 'End index must be greater than start',
          type: 'invalid-range',
        },
      ],
    });
  });

  it('test validateSpanInContext with a valid span', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 1,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual({ isValid: true, errors: [] });
  });

  it('test validateSpanInContext with a valid span (adjacent left)', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 2,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span1', start: 2, end: 3, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual({ isValid: true, errors: [] });
  });

  it('test validateSpanInContext with a valid span (adjacent right)', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 2,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span1', start: 2, end: 3, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual({ isValid: true, errors: [] });
  });

  it('test validateSpanInContext with an invalid span (negative-start)', () => {
    // Note: other cases which test the validity of the span in isolation are already
    // tested under validateSpan().
    const span = {
      id: 'span0',
      start: -1,
      end: 1,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual({
      isValid: false,
      errors: [
        { message: 'Start index cannot be negative', type: 'negative-start' },
      ],
    });
  });

  it('test validateSpanInContext with an invalid span (repeated)', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 1,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span0', start: 0, end: 1, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual(OVERLAPPING_SPAN_RESULT);
  });

  it('test validateSpanInContext with an invalid span (contained)', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 1,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span0', start: 0, end: 2, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual(OVERLAPPING_SPAN_RESULT);
  });

  it('test validateSpanInContext with an invalid span (contains)', () => {
    const span = {
      id: 'span0',
      start: 0,
      end: 3,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span0', start: 1, end: 2, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual(OVERLAPPING_SPAN_RESULT);
  });

  it('test validateSpanInContext with an invalid span (overlap left)', () => {
    const span = {
      id: 'span0',
      start: 1,
      end: 3,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span0', start: 0, end: 2, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual(OVERLAPPING_SPAN_RESULT);
  });

  it('test validateSpanInContext with an invalid span (overlap right)', () => {
    const span = {
      id: 'span0',
      start: 1,
      end: 3,
      labelId: 'label1',
      created: new Date('2023-06-14T19:53:11.864Z'),
    };
    const spans = <Span[]>[{ id: 'span0', start: 2, end: 4, label: 'label1' }];
    const result = annotation.validateSpanInContext(span, spans);
    expect(result).toEqual(OVERLAPPING_SPAN_RESULT);
  });
});
