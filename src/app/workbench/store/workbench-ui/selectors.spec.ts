import { TestBed } from '@angular/core/testing';

import { WorkbenchUiState } from '@workbench/store/workbench-ui';
import { initialWorkbenchUiState } from './reducer';

import * as selectors from './selectors';

const workbenchUiState: WorkbenchUiState = {
  ...initialWorkbenchUiState,
  selectedAnnotatorId: 'exact-matches',
  runAutomatically: true,
};

describe('WorkbenchSelectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test initialization', () => {
    expect(selectors).toBeTruthy();
  });

  it('test selectCurrentAnnotatorId', () => {
    expect(
      selectors.selectCurrentAnnotatorId.projector(workbenchUiState)
    ).toEqual('exact-matches');
  });

  it('test selectRunAutomatically', () => {
    expect(
      selectors.selectRunAutomatically.projector(workbenchUiState)
    ).toEqual(true);
  });
  it('test isAnnotatorSelected', () => {
    expect(selectors.isAnnotatorSelected.projector('exact-matches')).toBe(true);
  });
});
