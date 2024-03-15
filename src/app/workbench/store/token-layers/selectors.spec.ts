import { TestBed } from '@angular/core/testing';

import { LoadingState } from '@app/interfaces';
import { TokenLayersState } from '@workbench/store/token-layers';

import * as selectors from './selectors';

const tokenLayersState: TokenLayersState = {
  ids: [1, 2],
  entities: {
    1: {
      text: 1,
      id: 1,
      name: 'tokens',
      boundaries: [1, 2, 3],
    },
    2: {
      text: 2,
      id: 2,
      name: 'bytes',
      boundaries: [],
    },
  },
  selectedTokenLayerId: 1,
  callState: LoadingState.LOADED,
};

describe('TokenLayersSelectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test hasTokenLayers', () => {
    expect(selectors.hasTokenLayers.projector(1)).toBe(true);
  });

  it('test isTokenLayerSelected', () => {
    expect(selectors.isTokenLayerSelected.projector(1)).toBe(true);
  });

  it('test isTokenLayerSelected with null (expects false)', () => {
    expect(selectors.isTokenLayerSelected.projector(null)).toBe(false);
  });

  it('test selectAllTokenLayers', () => {
    expect(selectors.selectAllTokenLayers.projector(tokenLayersState)).toEqual([
      {
        text: 1,
        id: 1,
        name: 'tokens',
        boundaries: [1, 2, 3],
      },
      {
        text: 2,
        id: 2,
        name: 'bytes',
        boundaries: [],
      },
    ]);
  });

  it('test selectBoundariesLength', () => {
    expect(selectors.selectBoundariesLength.projector([1, 2, 3])).toBe(3);
  });

  it('test selectBoundariesLength with undefined', () => {
    expect(selectors.selectBoundariesLength.projector(undefined)).toBe(0);
  });

  it('test selectCurrentBoundaries', () => {
    expect(
      selectors.selectCurrentBoundaries.projector({
        text: 1,
        id: 1,
        name: 'tokens',
        boundaries: [1, 2, 3],
      })
    ).toEqual([1, 2, 3]);
  });

  it('test selectCurrentTokenLayer', () => {
    expect(
      selectors.selectCurrentTokenLayer.projector(tokenLayersState.entities, 1)
    ).toEqual({
      text: 1,
      id: 1,
      name: 'tokens',
      boundaries: [1, 2, 3],
    });
  });

  it('test selectCurrentTokenLayerId', () => {
    expect(
      selectors.selectCurrentTokenLayerId.projector(tokenLayersState)
    ).toBe(1);
  });

  it('test selectTokenLayerEntities', () => {
    expect(
      selectors.selectTokenLayerEntities.projector(tokenLayersState)
    ).toEqual({
      1: {
        text: 1,
        id: 1,
        name: 'tokens',
        boundaries: [1, 2, 3],
      },
      2: {
        text: 2,
        id: 2,
        name: 'bytes',
        boundaries: [],
      },
    });
  });

  it('test selectTokenLayerIds', () => {
    expect(selectors.selectTokenLayerIds.projector(tokenLayersState)).toEqual([
      1, 2,
    ]);
  });

  it('test selectTokenLayerTotal', () => {
    expect(selectors.selectTokenLayerTotal.projector(tokenLayersState)).toBe(2);
  });
});
