import { initialState, labelsReducer } from './reducer';

describe('Label Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = labelsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
