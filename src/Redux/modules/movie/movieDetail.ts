import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../../api';

const prefix = 'netflix/movie';

//액션 타입 정의
const GET_MOVIE_DETAIL_START = `${prefix}/GET_MOVIE_DETAIL_START`;
const GET_MOVIE_DETAIL_SUCCESS = `${prefix}/GET_MOVIE_DETAIL_SUCCESS`;
const GET_MOVIE_DETAIL_FAIL = `${prefix}/GET_MOVIE_DETAIL_FAIL`;

//액션 생성자 정의

export const getMovieDetailStart = (data: any) => {
  return {
    type: GET_MOVIE_DETAIL_START,
    meta: data,
  };
};

export const getMovieDetailSuccess = (data: any) => {
  return {
    type: GET_MOVIE_DETAIL_SUCCESS,
    payload: data,
  };
};

export const getMovieDetailFail = (data: any) => {
  return {
    type: GET_MOVIE_DETAIL_FAIL,
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
    [GET_MOVIE_DETAIL_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_MOVIE_DETAIL_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_MOVIE_DETAIL_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default reducer;

//saga

export function* getMovieDetailSaga(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(MoviesApi.movieDetail, action.meta);
    yield put(getMovieDetailSuccess(response.data));
  } catch (error) {
    yield put(getMovieDetailFail(error));
  }
}

export function* getMovieDetailSagas() {
  yield takeLatest(GET_MOVIE_DETAIL_START, getMovieDetailSaga);
}
