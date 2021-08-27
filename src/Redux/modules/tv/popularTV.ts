import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TVApi } from '../../../api';

const prefix = 'netflix/tv';

// 액션 타입 정의

const GET_POPULAR_TV_START = `${prefix}/GET_POPULAR_TV_START`;
const GET_POPULAR_TV_SUCCESS = `${prefix}/GET_POPULAR_TV_SUCCESS`;
const GET_POPULAR_TV_FAIL = `${prefix}/GET_POPULAR_TV_FAIL`;

// 액션 생성자 정의

export const getPopularTVStart = () => {
  return { type: GET_POPULAR_TV_START };
};

export const getPopularTVSuccess = (data: any) => {
  return { type: GET_POPULAR_TV_SUCCESS, payload: data };
};

export const getPopularTVFail = (data: any) => {
  return { type: GET_POPULAR_TV_FAIL, payload: data };
};

// 초기값

interface TVState {
  data: Array<any>;
  loading: boolean;
  error: null;
}

const initialState: TVState = {
  data: [],
  loading: true,
  error: null,
};

const reducer = handleActions<TVState, any>(
  {
    [GET_POPULAR_TV_START]: (state) => ({ ...state, loading: true, error: null }),
    [GET_POPULAR_TV_SUCCESS]: (state, action) => ({ data: action.payload, loading: false, error: null }),
    [GET_POPULAR_TV_FAIL]: (state, action) => ({ data: [], loading: false, error: action.payload }),
  },
  initialState
);

export default reducer;

// saga

export function* getPopularTVSaga() {
  try {
    const response: AxiosResponse<any> = yield call(TVApi.popular);
    yield put(getPopularTVSuccess(response.data.results));
  } catch (error) {
    yield put(getPopularTVFail(error));
  }
}

export function* getPopularTVSagas() {
  yield takeLatest(GET_POPULAR_TV_START, getPopularTVSaga);
}
