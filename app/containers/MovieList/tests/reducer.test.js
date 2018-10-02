import { fromJS } from 'immutable';
import movieListReducer from '../reducer';

describe('movieListReducer', () => {
  it('returns the initial state', () => {
    expect(movieListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
