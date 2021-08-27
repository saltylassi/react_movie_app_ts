import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TVApi } from '../../../api';

const prefix = 'netflix/Show';

//액션 타입 정의
const GET_SHOW_DETAIL_START = `${prefix}/GET_SHOW_DETAIL_START`;
const GET_SHOW_DETAIL_SUCCESS = `${prefix}/GET_SHOW_DETAIL_SUCCESS`;
const GET_SHOW_DETAIL_FAIL = `${prefix}/GET_SHOW_DETAIL_FAIL`;

//액션 생성자 정의

export const getShowDetailStart = (data: any) => {
  return {
    type: GET_SHOW_DETAIL_START,
    meta: data,
  };
};

export const getShowDetailSuccess = (data: any) => {
  return {
    type: GET_SHOW_DETAIL_SUCCESS,
    payload: data,
  };
};

export const getShowDetailFail = (data: any) => {
  return {
    type: GET_SHOW_DETAIL_FAIL,
    payload: data,
  };
};

//초기값

interface ShowState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const initialState: ShowState = {
  data: [],
  loading: true,
  error: null,
};

//reducer

const reducer = handleActions<ShowState, any>(
  {
    [GET_SHOW_DETAIL_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_SHOW_DETAIL_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_SHOW_DETAIL_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default reducer;

//saga

export function* getShowDetailSaga(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(TVApi.showDetail, action.meta);
    yield put(getShowDetailSuccess(response.data));
  } catch (error) {
    yield put(getShowDetailFail(error));
  }
}

export function* getShowDetailSagas() {
  yield takeLatest(GET_SHOW_DETAIL_START, getShowDetailSaga);
}
