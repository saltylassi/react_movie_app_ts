import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TVApi } from '../../../api';
const prefix = 'netflix/tv';

// 액션 타입 정의

const GET_AIRING_TODAY_START = `${prefix}/GET_AIRING_TODAY_START`;
const GET_AIRING_TODAY_SUCCESS = `${prefix}/GET_AIRING_TODAY_SUCCESS`;
const GET_AIRING_TODAY_FAIL = `${prefix}/GET_AIRING_TODAY_FAIL`;

// 액션 생성자 정의

export const getAiringTodayStart = () => {
  return { type: GET_AIRING_TODAY_START };
};

export const getAiringTodaySuccess = (data: any) => {
  return { type: GET_AIRING_TODAY_SUCCESS, payload: data };
};

export const getAiringTodayFail = (data: any) => {
  return { type: GET_AIRING_TODAY_FAIL, payload: data };
};

// 초기값

interface TVState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const initialState = {
  data: [],
  loading: true,
  error: null,
};

// 리듀서

const reducer = handleActions<TVState, any>(
  {
    [GET_AIRING_TODAY_START]: (state) => ({ ...state, loading: true, error: null }),
    [GET_AIRING_TODAY_SUCCESS]: (state, action) => ({ data: action.payload, loading: false, error: null }),
    [GET_AIRING_TODAY_FAIL]: (state, action) => ({ data: [], loading: false, error: action.payload }),
  },
  initialState
);

export default reducer;

// saga

export function* getAiringTodaySaga() {
  try {
    const response: AxiosResponse<any> = yield call(TVApi.airingToday);
    yield put(getAiringTodaySuccess(response.data.results));
  } catch (error) {
    yield put(getAiringTodayFail(error));
  }
}

export function* getAiringTodaySagas() {
  yield takeLatest(GET_AIRING_TODAY_START, getAiringTodaySaga);
}
