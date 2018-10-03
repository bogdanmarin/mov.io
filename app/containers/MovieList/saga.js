import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as constants from './constants';
// import { take, call, put, select } from 'redux-saga/effects';

export default function* root() {
  yield takeLatest(constants.FETCH_MOVIES, fetchMovies);
  yield takeLatest(constants.FILTER_GENRE, applyFilter);
  yield takeLatest(constants.FILTER_RATING, applyFilter);
}

function getMovies() {
  return axios({
    method: 'get',
    url:
      'https://api.themoviedb.org/3/movie/now_playing?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&page=1',
  });
}

function getGenders() {
  return axios({
    method: 'get',
    url:
      'https://api.themoviedb.org/3/genre/movie/list?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US',
  });
}

export function* applyFilter() {
  yield put({
    type: constants.APPLY_FILTER,
  });
}

export function* fetchMovies() {
  try {
    const moviesResponse = yield call(getMovies);
    let movies = moviesResponse.data;
    movies = movies.results || [];
    const gendersResponse = yield call(getGenders);
    let { genres } = gendersResponse.data;
    genres = genres.map(g => ({
      ...g,
      checked: false,
    }));
    // Resolve genres for each moview
    movies = movies.map(movie => {
      const movieGenres = [];
      for (let i = 0; i < movie.genre_ids.length; i += 1) {
        movieGenres.push(
          genres.filter(g => g.id === movie.genre_ids[i])[0].name,
        );
      }
      return {
        ...movie,
        genres: movieGenres,
      };
    });

    yield put({
      type: constants.FETCH_MOVIES_SUCCESS,
      movies,
      genres,
    });

    yield put({
      type: constants.APPLY_FILTER,
    });
  } catch (error) {
    yield put({
      type: constants.FETCH_MOVIES_FAILURE,
      error,
    });
  }
}
