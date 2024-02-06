import { Span } from './span.interface';

export interface SpanForDisplay extends Span {
  content: string;
  labelContent: string;
  color: string;
}
