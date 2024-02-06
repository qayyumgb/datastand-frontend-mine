import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { ClearAllAnnotationsDialogComponent } from '@workbench/components';
import {
  ElementForDisplay,
  SpanForDisplay,
  TokenForDisplay,
  isSpanForDisplay,
} from '@workbench/interfaces';
import * as utils from '@workbench/utils';

import {
  acceptSuggestions,
  addSpan,
  rejectSuggestions,
  runAnnotator,
  selectLabelFromKeyboard,
} from './annotations-tab.actions';
import { selectAnnotationsTabModel } from './annotations-tab.selectors';

const allowedSelectLabelKeys: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

@Component({
  selector: 'app-annotations-tab',
  templateUrl: './annotations-tab.component.html',
  styleUrls: [
    '../tabs.scss',
    './annotations-tab.component.scss',
    '../context-menu.scss',
  ],
})
export class AnnotationsTabComponent implements OnInit {
  @Input() workbenchScrollTop!: number;
  @Input() isTabSelected!: boolean;
  readonly vm$ = this.store.select(selectAnnotationsTabModel);
  // Attributes for handling mouse label.
  labelLeft: string = '0px';
  labelTop: string = '0px';
  labelIsVisible: boolean = false;
  // Attributes for handling spans.
  onMouseDownStart?: number | null;
  onMouseDownEnd?: number | null;
  // Attributes for handling keyboard actions.
  prevKey?: string | null;
  // Paginator
  length: number = 0;
  pageSize = 500;
  pageIndex = 0;
  pageSizeOptions = [500, 1000, 2000];
  pageEvent?: PageEvent;

  ngOnInit() {
    this.vm$.subscribe((vm) => {
      if (vm.elementsForDisplay && vm.elementsForDisplay.length > 0) {
        this.length = vm.elementsForDisplay.length;
      }
    });
  }

  /** Handle page event.
   *
   * This method is called when the user changes the page.
   * See: https://material.angular.io/components/paginator/
   * @param e Page event.
   */
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  constructor(private dialog: MatDialog, private store: Store) {}

  getPaginatedElements(
    elements: ElementForDisplay[],
    pageIndex: number,
    pageSize: number
  ): ElementForDisplay[] {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return [...elements.slice(start, end)];
  }

  acceptSuggestions() {
    this.store.dispatch(acceptSuggestions());
  }

  // TODO(gustavoauma): Refactor this. There is probably a better way to merge
  // the logic for annotating with left- and right-click.
  addSpanFromContextMenu(start: number, end: number, labelId: number) {
    const span = utils.createSpan(start, end, labelId);
    this.store.dispatch(
      addSpan({
        span,
      })
    );
  }

  hideMouseLabel() {
    this.labelIsVisible = false;
  }

  isSpanForDisplay = isSpanForDisplay;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Ignore actions if this is not the right tab.
    if (!this.isTabSelected) {
      return;
    }
    // Handle select label from keyboard.
    if (allowedSelectLabelKeys.includes(event.key)) {
      // Dont dispatch an action if key is '0' and there is no prevKey.
      if (event.key === '0' && !this.prevKey) {
        return;
      }
      this.store
        .select(selectAnnotationsTabModel)
        .pipe(take(1))
        .subscribe((vm) => {
          const labelIndex = this.resolveLabelIndex(
            event.key,
            this.prevKey!,
            vm.labelEntitiesTotal!
          );
          if (labelIndex != null) {
            this.store.dispatch(
              selectLabelFromKeyboard({
                labelIndex: labelIndex,
              })
            );
          }
        });
      this.prevKey = event.key;
      // Clean the prevKey after 1 second.
      setTimeout(() => {
        this.prevKey = null;
      }, 1000);
    }
  }

  makeTokenDivId(token: TokenForDisplay | SpanForDisplay) {
    return 'token-' + token.id;
  }

  onMouseDown(event: MouseEvent) {
    if (event.button == 0) {
      return this.onLeftMouseDown(event);
    }
    if (event.button == 2) {
      return this.onRightMouseDown(event);
    }
  }

  onMouseUp(event: MouseEvent) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (event.button == 0) {
      return this.onLeftMouseUp(event);
    }
  }

  onLeftMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Ensure that the user pressed the left mouse button.
    if (event.button != 0) {
      return;
    }

    if (target.classList.contains('token')) {
      const tokenStart = parseInt(target.getAttribute('token-start')!);
      const tokenEnd = parseInt(target.getAttribute('token-end')!);
      if (tokenStart != null && tokenEnd != null) {
        this.onMouseDownStart = tokenStart;
        this.onMouseDownEnd = tokenEnd;
      }
    }
  }

  onLeftMouseUp(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Ensure that the user pressed the left mouse button.
    if (event.button != 0) {
      return;
    }

    // Check if the target is a token.
    if (!target.classList.contains('token')) {
      return;
    }

    // Get the token-id attribute
    const tokenId = target.getAttribute('token-id');
    const tokenStart = parseInt(target.getAttribute('token-start')!);
    const tokenEnd = parseInt(target.getAttribute('token-end')!);

    // Resolve the spans.
    // The user may have selected the token from left to right or right to left.
    if (
      tokenId &&
      tokenStart != null &&
      tokenEnd != null &&
      this.onMouseDownStart != null &&
      this.onMouseDownEnd != null
    ) {
      const start = Math.min(
        tokenStart,
        tokenEnd,
        this.onMouseDownStart,
        this.onMouseDownEnd
      );
      const end = Math.max(
        tokenStart,
        tokenEnd,
        this.onMouseDownStart,
        this.onMouseDownEnd
      );

      this.vm$.pipe(take(1)).subscribe((vm) => {
        if (vm.currentLabel) {
          const span = utils.createSpan(start, end, vm.currentLabel.id!);
          this.store.dispatch(
            addSpan({
              span,
            })
          );
        }
      });

      // Reset the mouse down attributes.
      this.onMouseDownStart = null;
      this.onMouseDownEnd = null;
    }
  }

  onRightMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Ensure that the user pressed the right mouse button.
    if (event.button != 2) {
      return;
    }

    if (target.classList.contains('token')) {
      const tokenStart = parseInt(target.getAttribute('token-start')!);
      const tokenEnd = parseInt(target.getAttribute('token-end')!);
      if (tokenStart != null && tokenEnd != null) {
        this.onMouseDownStart = tokenStart;
        this.onMouseDownEnd = tokenEnd;
      }
    }
  }

  openClearAllAnnotationsDialog(): void {
    this.dialog.open(ClearAllAnnotationsDialogComponent);
  }

  isLineBreakCh = utils.isLineBreakCh;

  isSpecialCh = utils.isSpecialCh;

  rejectSuggestions() {
    this.store.dispatch(rejectSuggestions());
  }

  renderContent = utils.renderContent;

  /** Resolve the label index from the key(s) pressed.
   * @param key The key pressed.
   * @param prevKey The previous key pressed (or null if there is none).
   * @param numLabels The number of labels.
   * @returns The label index or null if the parsed index is out of bounds.
   */
  resolveLabelIndex(
    key: string,
    prevKey: string | null,
    numLabels: number
  ): number | null {
    if (prevKey) {
      const combinedIndex = parseInt(prevKey + key) - 1;
      if (combinedIndex <= numLabels - 1) {
        return combinedIndex;
      }
    }
    const labelIndex = parseInt(key) - 1;
    if (labelIndex <= numLabels - 1) {
      return labelIndex;
    }
    return null;
  }

  runAnnotator(annotatorId: string): void {
    this.store.dispatch(runAnnotator({ annotatorId }));
  }

  showMouseLabel(event: MouseEvent) {
    this.labelIsVisible = true;
    this.updateMouseLabelPosition(event);
  }

  updateMouseLabelPosition(event: MouseEvent) {
    this.labelLeft = event.clientX - 470 + 'px';
    this.labelTop = event.clientY + this.workbenchScrollTop - 145 + 'px';
  }
}
