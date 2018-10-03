/*
 *
 * MovieList reducer
 *
 */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { fromJS, List } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  results: [],
  filter: {
    facets: {
      genres: {
        values: [],
        type: 'array',
      },
      vote_average: {
        value: 3,
        type: 'number',
      },
    },
    sort: {
      property: 'popularity',
      op: 'desc',
    },
  },
  genres: [],
  filteredResults: [],
});

function arrayContainsAnotherArray(needle, haystack) {
  for (let i = 0; i < needle.size; i += 1) {
    if (haystack.indexOf(needle.get(i)) === -1) return false;
  }
  return true;
}

function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_MOVIES_SUCCESS:
      return state
        .set('results', List(action.movies))
        .set('filteredResults', List(action.movies))
        .set('genres', List(action.genres));
    case constants.FETCH_MOVIES_FAILURE:
      return state.set('results', []);
    case constants.APPLY_FILTER: {
      const filter = state.get('filter');

      const sortOp = filter.get('sort').get('op');
      const sortProperty = filter.get('sort').get('property');
      state.set(
        'filteredResults',
        state.get('results').sort((a, b) => sortOp === "desc"? b[sortProperty] - a[sortProperty]: a[sortProperty] - b[sortProperty]),
      );

      const facets = filter.get('facets');

      const filtered = state.get('results').filter((movie)=>{
        let hasAllFacets = true;

        const genres = facets.get('genres');
        const vote_average = facets.get('vote_average');
        hasAllFacets = arrayContainsAnotherArray(genres.get('values'), movie.genres)
          &&  movie.vote_average > vote_average.get('value');

        return hasAllFacets;
      });

      return state.set('filteredResults', filtered);
    }
    case constants.FILTER_GENRE: {
      const indexOfListToUpdate = state.get('genres').findIndex(g => g.name === action.genre.name);
      const indexToDelete = state
        .getIn(['filter', 'facets', 'genres', 'values'])
        .findIndex(v => v.name === action.name);
      if (action.genre.checked) {
        return state
          .updateIn(['filter', 'facets', 'genres', 'values'], list => list.delete(indexToDelete)
            .push(action.genre.name))
          .updateIn(['genres', indexOfListToUpdate ], o => ({...o, checked: true}) )
      }

      return state.updateIn(['filter', 'facets', 'genres', 'values'], list => list.delete(indexToDelete))
        .updateIn(['genres', indexOfListToUpdate], o => ({ ...o, checked: false }));
    }

    case constants.FILTER_RATING: {
      return state.updateIn(
        ['filter', 'facets', 'vote_average', 'value'], v => v - v + action.rating,
      );
    }

    default:
      return state;
  }
}

export default movieListReducer;
