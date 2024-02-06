import { AuthoredModel } from '@app/interfaces/abstract';

// TODO(gustavoauma): Move enums to a new location.
export enum SpanSource {
  Manual = 'manual',
  Bot = 'bot',
  Suggestion = 'suggestion',
}

export enum SpanStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export interface Span extends AuthoredModel {
  id: number;
  start: number;
  end: number;
  label?: number;
  text?: number;
  source?: SpanSource; // TODO: Remove this field.
  status?: SpanStatus; // TODO: Remove this field.
  created: Date;

  is_suggestion?: boolean;
  value?: string;
  suggestion_model?: string;
  suggestion_status?: 'new' | 'accepted' | 'rejected';
}
