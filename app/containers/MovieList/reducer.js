/*
 *
 * MovieList reducer
 *
 */

import { fromJS, List }  from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  results: [],
  filter: {
    facets: {
      genres: {
        values: [],
        type:  "array"
      },
      vote_average: {
        value: 0,
        type: "number"
      }
    },
    sort: {
      property: "popularity",
      op: "desc"
    }
  },
  genres:[],
  filteredResults:[]
});

function arrayContainsAnotherArray(needle, haystack){
  for(var i = 0; i < needle.size; i++){
    if(haystack.indexOf(needle.get(i)) === -1)
       return false;
  }
  return true;
}

function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_MOVIES_SUCCESS:
      return state.set('results', List(action.movies)).set('filteredResults', List(action.movies)).set('genres', List(action.genres));
    case constants.FETCH_MOVIES_FAILURE:
      return state.set('results', []);
    case constants.APPLY_FILTER:{
      let filter = state.get('filter');

      let sortOp = filter.get('sort').get('op');
      let sortProperty = filter.get('sort').get('property');
      state.set('filteredResults', state.get('results')
        .sort((a, b) => {
          return sortOp==="desc"? b[sortProperty] - a[sortProperty]: a[sortProperty] - b[sortProperty]
        })
      );

      let facets = filter.get('facets');

        let filtered = state.get('results').filter((movie)=>{
          let hasAllFacets = true;

          let genres = facets.get('genres');
          let vote_average = facets.get('vote_average');
          hasAllFacets = arrayContainsAnotherArray(genres.get('values'), movie['genres'])
          &&  movie['vote_average'] > vote_average.get('value');
          // let hasAllFacets = true;
          // for(let i = 0; i < facets.size; i++){
          //   debugger;
          //   let facet = facets.get(i);
          //   if (facet.get('type') === "array")
          //     hasAllFacets = arrayContainsAnotherArray(facet.get('values'), movie[facet.get('property')]);
          //   else
          //   if (facet.get('type') === "number")
          //     hasAllFacets = movie[facet.get('property')] > facet.get('value');
          //   //unknown facet type, return true
          //   else hasAllFacets = false;

          //   if (!hasAllFacets)
          //   break;

          // }

          return hasAllFacets;
        });

        return state.set('filteredResults', filtered);
    }
    case constants.FILTER_GENRE:{

      // let filtered = state.get('filter').get('facets').filter((facet)=>{
      //   return facet.get('property')==='genres';
      // });

      // let genreFilter = filtered.get(0);

      // if (action.genre.checked){
      //   genreFilter.get('values').push(action.genre.name);
      // }else{
      //   genreFilter.get('values').delete(action.genre.name);
      // }
      if (action.genre.checked){
        return state.updateIn(['filter', 'facets', 'genres', 'values'], list=> list.push(action.genre.name));
      }else{
        return state.updateIn(['filter', 'facets', 'genres', 'values'], list=>list.delete(action.genre.name));
      }
    }

    default:
      return state;
  }
}

export default movieListReducer;
