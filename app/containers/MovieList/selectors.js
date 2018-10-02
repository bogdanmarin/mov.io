import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movieList state domain
 */

const selectMovieListDomain = state => state.get('movieList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovieList
 */

const makeSelectMovieList = () =>
  createSelector(selectMovieListDomain, substate => substate.toJS());

export default makeSelectMovieList;
export { selectMovieListDomain };
