import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TVApi } from '../../../api';

// 액션 타입 정의

const prefix = 'netflix/tv';

const GET_SEARCH_TV_START = `${prefix}/GET_SEARCH_TV_START`;
const GET_SEARCH_TV_SUCCESS = `${prefix}/GET_SEARCH_TV_SUCCESS`;
const GET_SEARCH_TV_FAIL = `${prefix}/GET_SEARCH_TV_FAIL`;

// 액션 생성자 정의

export const getSearchTVStart = (data: any) => {
  return { type: GET_SEARCH_TV_START, meta: data };
};

export const getSearchTVSuccess = (data: any) => {
  return { type: GET_SEARCH_TV_SUCCESS, payload: data };
};

export const getSearchTVFail = (data: any) => {
  return { type: GET_SEARCH_TV_FAIL, payload: data };
};

// 초기값

interface TVState {
  data: Array<any>;
  loading: boolean;
  error: null;
}

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// reducer

const reducer = handleActions<TVState, any>(
  {
    [GET_SEARCH_TV_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_SEARCH_TV_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_SEARCH_TV_FAIL]: (state, action) => ({
      data: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState
);

export default reducer;

// saga

export function* getSearchTVSaga(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(TVApi.search, action.meta);
    yield put(getSearchTVSuccess(response.data.results));
  } catch (error) {
    yield put(getSearchTVFail(error));
  }
}

export function* getSearchTVSagas() {
  yield takeLatest(GET_SEARCH_TV_START, getSearchTVSaga);
}
