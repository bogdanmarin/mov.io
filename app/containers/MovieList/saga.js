import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as constants from './constants';
// import { take, call, put, select } from 'redux-saga/effects';

export default function* root(){
  yield takeLatest(constants.FETCH_MOVIES, fetchMovies);
}

function getMovies(){
  return axios({
    method: "get",
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&page=1"
  });
}

function getGenders(){
  return axios({
    method:"get",
    url: "https://api.themoviedb.org/3/genre/movie/list?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US"
  });
}

export function* fetchMovies(action){
  try {

    const moviesResponse = yield call(getMovies);
    let movies = moviesResponse.data;
    movies = movies.results || [];
    const gendersResponse = yield call(getGenders);
    let genres = gendersResponse.data.genres;
    genres = genres.map((g)=>{
      return {
        ...g,
        checked: false
      }
    });
    //Resolve genres for each moview
    movies = movies.map((movie)=>{
      let movieGenres = [];
      for(let i = 0; i < movie.genre_ids.length; i++){
        movieGenres.push(genres.filter((g)=> g.id === movie.genre_ids[i])[0].name);
      }
      return {
        ...movie,
        genres: movieGenres
      }
    })



    yield put({
      type: constants.FETCH_MOVIES_SUCCESS,
      movies,
      genres
    });

    yield put({
      type: constants.APPLY_FILTER,
      filter: action.filter
    });
  }
  catch(error){
    yield put({
      type: constants.FETCH_MOVIES_FAILURE,
      error
    })
  }

}
