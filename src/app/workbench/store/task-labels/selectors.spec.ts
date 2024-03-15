import { TestBed } from '@angular/core/testing';

import { LabelContentType } from '@app/interfaces/abstract';
import { TaskLabelsState } from '@workbench/store/task-labels';

import * as selectors from './selectors';

const LABEL_A = {
  id: 1,
  name: 'labelA',
  value: 'labelA',
  object_id: 1,
  content_type: <LabelContentType>'task',
};

const LABEL_B = {
  id: 2,
  name: 'labelB',
  value: 'labelB',
  object_id: 2,
  content_type: <LabelContentType>'task',
};

describe('LabelSelectors', () => {
  const labelA = LABEL_A;
  const labelB = LABEL_B;
  const labels = [labelA, labelB];
  const initialState: TaskLabelsState = {
    ids: [1, 2],
    entities: {
      1: labelA,
      2: labelB,
    },
    selectedLabelId: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('test selectLabelEntities', () => {
    expect(selectors.selectLabelEntities.projector(initialState)).toEqual({
      1: LABEL_A,
      2: LABEL_B,
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
    expect(selectors.selectCurrentLabelId.projector(initialState)).toEqual(1);
  });

  it('test selectCurrentLabelIndex', () => {
    expect(selectors.selectCurrentLabelIndex.projector(labels, 1)).toEqual(0);
  });

  it('test selectCurrentLabel', () => {
    expect(
      selectors.selectCurrentLabel.projector(initialState.entities, 1)
    ).toEqual(LABEL_A);
  });

  it('test selectCurrentLabelName', () => {
    expect(selectors.selectCurrentLabelName.projector(labelA)).toEqual(
      'labelA'
    );
  });

  it('test isLabelSelected', () => {
    expect(selectors.isLabelSelected.projector(1)).toEqual(true);
  });
});
