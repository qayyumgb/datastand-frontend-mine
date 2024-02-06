import { TestBed } from '@angular/core/testing';

import { TaskLabelsState } from '@workbench/interfaces';

import * as selectors from './selectors';

const LABEL_A = { id: 'labelA', name: 'labelA', value: 'labelA', task: 'A' };
const LABEL_B = { id: 'labelB', name: 'labelB', value: 'labelB', task: 'B' };

describe('LabelSelectors', () => {
  const labelA = LABEL_A;
  const labelB = LABEL_B;
  const labels = [labelA, labelB];
  const initialState: TaskLabelsState = {
    ids: ['labelA', 'labelB'],
    entities: {
      labelA: labelA,
      labelB: labelB,
    },
    selectedLabelId: 'labelA',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test selectLabelEntities', () => {
    expect(selectors.selectLabelEntities.projector(initialState)).toEqual({
      labelA: LABEL_A,
      labelB: LABEL_B,
    });
  });

  it('test selectCurrentLabels', () => {
    expect(
      selectors.selectCurrentLabels.projector(initialState.entities)
    ).toEqual([LABEL_A, LABEL_B]);
  });

  it('test selectAllLabels', () => {
    expect(selectors.selectAllLabels.projector(initialState)).toEqual([
      LABEL_A,
      LABEL_B,
    ]);
  });

  it('test selectLabelEntitiesTotal', () => {
    expect(selectors.selectLabelEntitiesTotal.projector(labels)).toEqual(2);
  });

  it('test hasLabelEntities', () => {
    expect(selectors.hasLabelEntities.projector(2)).toEqual(true);
  });

  it('test selectCurrentLabelId', () => {
    expect(selectors.selectCurrentLabelId.projector(initialState)).toEqual(
      'labelA'
    );
  });

  it('test selectCurrentLabelIndex', () => {
    expect(
      selectors.selectCurrentLabelIndex.projector(labels, 'labelA')
    ).toEqual(0);
  });

  it('test selectCurrentLabel', () => {
    expect(
      selectors.selectCurrentLabel.projector(initialState.entities, 'labelA')
    ).toEqual(LABEL_A);
  });

  it('test selectCurrentLabelName', () => {
    expect(selectors.selectCurrentLabelName.projector(labelA)).toEqual(
      'labelA'
    );
  });

  it('test isLabelSelected', () => {
    expect(selectors.isLabelSelected.projector('labelA')).toEqual(true);
  });
});
