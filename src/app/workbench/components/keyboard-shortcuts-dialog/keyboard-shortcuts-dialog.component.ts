import { Component } from '@angular/core';

export interface Shortcut {
  keyPattern: string;
  description: string;
}

const CORE_SHORTCUTS: Shortcut[] = [
  { description: 'Rename file', keyPattern: 'F2' },
  { description: 'Print', keyPattern: 'Ctrl+P' },
  { description: 'Send feedback', keyPattern: 'Ctrl+B' },
];

const LAYER_SHORTCUTS: Shortcut[] = [
  { description: 'Add token layer', keyPattern: 'Ctrl+Alt+K' },
  { description: 'Add annotation layer', keyPattern: 'Ctrl+Alt+A' },
  { description: 'Add comment', keyPattern: 'Ctrl+Alt+C' },
];

const ANNOTATION_SHORTCUTS: Shortcut[] = [
  { description: 'Select 1st label', keyPattern: '1' },
  { description: 'Select 2nd label', keyPattern: '2' },
  { description: 'Select 3rd label', keyPattern: '3' },
  { description: '...', keyPattern: '...' },
  { description: 'Select 10th label', keyPattern: '10' },
  { description: 'Select 11th label', keyPattern: '11' },
  { description: 'Select 12th label', keyPattern: '12' },
  { description: '...', keyPattern: '...' },
  { description: 'Select N-th label', keyPattern: 'N' },
];

@Component({
  selector: 'keyboard-shortcuts-dialog',
  templateUrl: './keyboard-shortcuts-dialog.component.html',
  styleUrls: ['./keyboard-shortcuts-dialog.component.scss'],
})
export class KeyboardShortcutsDialogComponent {
  displayedColumns: string[] = ['description', 'keyPattern'];

  dataSources = [CORE_SHORTCUTS, ANNOTATION_SHORTCUTS, LAYER_SHORTCUTS];
}
