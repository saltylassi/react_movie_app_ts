import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../../api';

const prefix = 'netflix/movie';

const GET_POPULAR_MOVIE_START = `${prefix}/GET_POPULAR_MOVIE_START`;
const GET_POPULAR_MOVIE_SUCCESS = `${prefix}/GET_POPULAR_MOVIE_SUCCESS`;
const GET_POPULAR_MOVIE_FAIL = `${prefix}/GET_POPULAR_MOVIE_FAIL`;

export const getPopularMovieStart = () => {
  return {
    type: GET_POPULAR_MOVIE_START,
  };
};

export const getPopularMovieSuccess = (data: any) => {
  return {
    type: GET_POPULAR_MOVIE_SUCCESS,
    payload: data,
  };
};

export const getPopularMovieFail = (error: any) => {
  return {
    type: GET_POPULAR_MOVIE_FAIL,
    payload: error,
  };
};

interface movieState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const initialState: movieState = {
  data: [],
  loading: true,
  error: null,
};

const reducer = handleActions<movieState, any>(
  {
    [GET_POPULAR_MOVIE_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_POPULAR_MOVIE_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_POPULAR_MOVIE_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default reducer;

//saga

export function* getPopularMovieSaga() {
  try {
    const response: AxiosResponse<any> = yield call(MoviesApi.popular);
    yield put(getPopularMovieSuccess(response.data.results));
  } catch (error) {
    yield put(getPopularMovieFail(error));
  }
}

export function* getPopularMovieSagas() {
  yield takeLatest(GET_POPULAR_MOVIE_START, getPopularMovieSaga);
}
