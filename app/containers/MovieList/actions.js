/*
 *
 * MovieList actions
 *
 */

import {
  FETCH_MOVIES,
  APPLY_FILTER,
  FILTER_GENRE,
  FILTER_RATING,
} from './constants';

export function fetchMovies(filter) {
  return {
    type: FETCH_MOVIES,
    filter,
  };
}

export function applyFilter(filter) {
  return {
    type: APPLY_FILTER,
    filter,
  };
}

export function filterGenre(genre) {
  return {
    type: FILTER_GENRE,
    genre,
  };
}

export function filterRating(rating) {
  return {
    type: FILTER_RATING,
    rating,
  };
}
