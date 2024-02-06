import { SpanForDisplay } from './span-for-display.interface';
import { TokenForDisplay } from './token-for-display.interface';

export type ElementForDisplay = SpanForDisplay | TokenForDisplay;

/** Custom Type Guard */
export const isSpanForDisplay = (
  element: ElementForDisplay
): element is SpanForDisplay => {
  let res_ = (element as SpanForDisplay).labelContent !== undefined;
  return res_;
};
