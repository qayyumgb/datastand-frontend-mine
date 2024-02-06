import { commentsReducer, initialCommentsState } from './reducer';

describe('Comment Reducer', () => {
  describe('unknown action', () => {
    it('test return the previous state', () => {
      const action = {} as any;

      const result = commentsReducer(initialCommentsState, action);

      expect(result).toBe(initialCommentsState);
    });
  });
});
