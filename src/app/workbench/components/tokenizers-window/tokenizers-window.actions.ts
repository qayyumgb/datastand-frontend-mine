import { createAction, props } from '@ngrx/store';

export const runTokenizer = createAction(
  '[Tokenizers Window] Tokenizer Run',
  props<{ tokenLayerId: number; model: string; keepExisting: boolean }>()
);

export const closeTokenizersWindow = createAction(
  '[Tokenizers Window] Window Closed'
);
