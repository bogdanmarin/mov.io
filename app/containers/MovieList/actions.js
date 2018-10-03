/*
 *
 * MovieList actions
 *
 */

import { FETCH_MOVIES, APPLY_FILTER, FILTER_GENRE } from './constants';

export function fetchMovies(filter) {
  return {
    type: FETCH_MOVIES,
    filter
  };
}

export function applyFilter(filter) {
  return {
    type: APPLY_FILTER,
    filter
  };
}

export function filterGenre(genre){
  return {
    type: FILTER_GENRE,
    genre
  }
}
