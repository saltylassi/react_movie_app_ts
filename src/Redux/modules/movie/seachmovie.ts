import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../../api';

const prefix = 'netflix/movie';

// 액션 타입 정의

const GET_SEARCH_MOVIE_START = `${prefix}/GET_SEARCH_MOVIE_START`;
const GET_SEARCH_MOVIE_SUCCESS = `${prefix}/GET_SEARCH_MOVIE_SUCCESS`;
const GET_SEARCH_MOVIE_FAIL = `${prefix}/GET_SEARCH_MOVIE_FAIL`;

// 액션 생성자 정의

export const getSearchMovieStart = (data: any) => {
  return { type: GET_SEARCH_MOVIE_START, meta: data };
};

export const getSearchMovieSuccess = (data: any) => {
  return { type: GET_SEARCH_MOVIE_SUCCESS, payload: data };
};

export const getSearchMovieFail = (data: any) => {
  return { type: GET_SEARCH_MOVIE_FAIL, payload: data };
};

// 초기값

interface movieState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const inititalState = {
  data: [],
  loading: true,
  error: null,
};

// reducer

const reducer = handleActions<movieState, any>(
  {
    [GET_SEARCH_MOVIE_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_SEARCH_MOVIE_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_SEARCH_MOVIE_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  inititalState
);

export default reducer;

// saga

export function* getSearchMovieSaga(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(MoviesApi.search, action.meta);
    yield put(getSearchMovieSuccess(response.data.results));
  } catch (error) {
    yield put(getSearchMovieFail(error));
  }
}

export function* getSearchMovieSagas() {
  yield takeLatest(GET_SEARCH_MOVIE_START, getSearchMovieSaga);
}
