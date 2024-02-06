import { Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';

import { TOKENIZE_MODELS, WHITESPACE_MODEL_ID } from '@app/constants';

import {
  closeTokenizersWindow,
  runTokenizer,
} from './tokenizers-window.actions';
import { selectTokenizersWindowModel } from './tokenizers-window.selectors';

@Component({
  selector: 'app-tokenizer',
  templateUrl: './tokenizers-window.component.html',
  styleUrls: [
    '../window/window.component.scss',
    './tokenizers-window.component.scss',
  ],
})
export class TokenizersWindowComponent {
  width: string = '200px';
  // 60px == topbar height
  // 200px == window height
  // 15px == gap
  top: string = 'calc(60px + 200px + 5% + 15px)';
  left: string = '5%';
  keepExisting: boolean = true;
  selectedModel = WHITESPACE_MODEL_ID;
  tokenizers = TOKENIZE_MODELS;
  readonly vm$ = this.store.select(selectTokenizersWindowModel);

  constructor(private store: Store) {}

  closeWindow(): void {
    this.store.dispatch(closeTokenizersWindow());
  }

  onSelectionChange(options: MatListOption[]) {
    this.selectedModel = options[0].value;
  }

  runTokenizer(tokenLayerId: number, model: string, keepExisting: boolean) {
    this.store.dispatch(runTokenizer({ tokenLayerId, model, keepExisting }));
  }
}
