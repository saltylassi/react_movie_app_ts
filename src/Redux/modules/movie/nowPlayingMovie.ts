import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../../api';

const prefix = 'netflix/movie';

//액션 타입 정의
const GET_NOW_PLAYING_MOVIE_START = `${prefix}/GET_NOW_PLAYING_MOVIE_START`;
const GET_NOW_PLAYING_MOVIE_SUCCESS = `${prefix}/GET_NOW_PLAYING_MOVIE_SUCCESS`;
const GET_NOW_PLAYING_MOVIE_FAIL = `${prefix}/GET_NOW_PLAYING_MOVIE_FAIL`;

//액션 생성자 정의

export const getNowPlayingMovieStart = () => {
  return {
    type: GET_NOW_PLAYING_MOVIE_START,
  };
};

export const getNowPlayingMovieSuccess = (data: any) => {
  return {
    type: GET_NOW_PLAYING_MOVIE_SUCCESS,
    payload: data,
  };
};

export const getNowPlayingMovieFail = (data: any) => {
  return {
    type: GET_NOW_PLAYING_MOVIE_FAIL,
    payload: data,
  };
};

//초기값

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

//reducer

const reducer = handleActions<movieState, any>(
  {
    [GET_NOW_PLAYING_MOVIE_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_NOW_PLAYING_MOVIE_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_NOW_PLAYING_MOVIE_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default reducer;

//saga

export function* getNowPlayingMovieSaga() {
  try {
    const response: AxiosResponse<any> = yield call(MoviesApi.nowPlaying);
    yield put(getNowPlayingMovieSuccess(response.data.results));
  } catch (error) {
    yield put(getNowPlayingMovieFail(error));
  }
}

export function* getNowPlayingMovieSagas() {
  yield takeLatest(GET_NOW_PLAYING_MOVIE_START, getNowPlayingMovieSaga);
}
