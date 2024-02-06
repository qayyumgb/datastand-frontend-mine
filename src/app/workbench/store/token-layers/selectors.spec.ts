import { TestBed } from '@angular/core/testing';

import { LoadStatus } from '@workbench/enums';
import { TokenLayersState } from '@workbench/interfaces';

import * as selectors from './selectors';

const tokenLayersState: TokenLayersState = {
  ids: ['a', 'b'],
  entities: {
    a: {
      text: '1',
      id: 'a',
      name: 'tokens',
      boundaries: [1, 2, 3],
    },
    b: {
      text: '2',
      id: 'b',
      name: 'bytes',
      boundaries: [],
    },
  },
  selectedTokenLayerId: 'a',
  error: null,
  status: LoadStatus.Success,
  histories: {},
};

describe('TokenLayersSelectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test hasTokenLayers', () => {
    expect(selectors.hasTokenLayers.projector(1)).toBe(true);
  });

  it('test isTokenLayerSelected', () => {
    expect(selectors.isTokenLayerSelected.projector('a')).toBe(true);
  });

  it('test isTokenLayerSelected with null (expects false)', () => {
    expect(selectors.isTokenLayerSelected.projector(null)).toBe(false);
  });

  it('test selectAllTokenLayers', () => {
    expect(selectors.selectAllTokenLayers.projector(tokenLayersState)).toEqual([
      {
        text: '1',
        id: 'a',
        name: 'tokens',
        boundaries: [1, 2, 3],
      },
      {
        text: '2',
        id: 'b',
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
        text: '1',
        id: 'a',
        name: 'tokens',
        boundaries: [1, 2, 3],
      })
    ).toEqual([1, 2, 3]);
  });

  it('test selectCurrentTokenLayer', () => {
    expect(
      selectors.selectCurrentTokenLayer.projector(
        tokenLayersState.entities,
        'a'
      )
    ).toEqual({
      text: '1',
      id: 'a',
      name: 'tokens',
      boundaries: [1, 2, 3],
    });
  });

  it('test selectCurrentTokenLayerId', () => {
    expect(
      selectors.selectCurrentTokenLayerId.projector(tokenLayersState)
    ).toBe('a');
  });

  it('test selectTokenLayerEntities', () => {
    expect(
      selectors.selectTokenLayerEntities.projector(tokenLayersState)
    ).toEqual({
      a: {
        text: '1',
        id: 'a',
        name: 'tokens',
        boundaries: [1, 2, 3],
      },
      b: {
        text: '2',
        id: 'b',
        name: 'bytes',
        boundaries: [],
      },
    });
  });

  it('test selectTokenLayerIds', () => {
    expect(selectors.selectTokenLayerIds.projector(tokenLayersState)).toEqual([
      'a',
      'b',
    ]);
  });

  it('test selectTokenLayerTotal', () => {
    expect(selectors.selectTokenLayerTotal.projector(tokenLayersState)).toBe(2);
  });
});
