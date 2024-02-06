import { initialState, spansReducer } from './reducer';

describe('Span Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = spansReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
