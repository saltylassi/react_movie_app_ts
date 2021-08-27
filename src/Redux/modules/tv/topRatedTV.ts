import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TVApi } from '../../../api';

// 액션 타입 정의
const prefix = 'netflix/tv';

const GET_TOP_RATED_TV_START = `${prefix}/GET_TOP_RATED_TV_START`;
const GET_TOP_RATED_TV_SUCCESS = `${prefix}/GET_TOP_RATED_TV_SUCCESS`;
const GET_TOP_RATED_TV_FAIL = `${prefix}/GET_TOP_RATED_TV_FAIL`;

// 액션 생성자 정의

export const getTopRatedTVStart = () => {
  return { type: GET_TOP_RATED_TV_START };
};

export const getTopRatedTVSucess = (data: any) => {
  return { type: GET_TOP_RATED_TV_SUCCESS, payload: data };
};

export const getTopRatedTVFail = (data: any) => {
  return { type: GET_TOP_RATED_TV_FAIL, payload: data };
};

// 초기값

interface TVState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const initialState: TVState = {
  data: [],
  loading: true,
  error: null,
};

//reducer

const reducer = handleActions<TVState, any>(
  {
    [GET_TOP_RATED_TV_START]: (state) => ({ ...state, loading: true, error: null }),
    [GET_TOP_RATED_TV_SUCCESS]: (state, action) => ({ data: action.payload, loading: false, error: null }),
    [GET_TOP_RATED_TV_FAIL]: (state, action) => ({ data: [], loading: false, error: action.payload }),
  },
  initialState
);

export default reducer;

// saga

export function* getTopRatedTVSaga() {
  try {
    const response: AxiosResponse<any> = yield call(TVApi.topRated);
    yield put(getTopRatedTVSucess(response.data.results));
  } catch (error) {
    yield put(getTopRatedTVFail(error));
  }
}

export function* getTopRatedTVSagas() {
  yield takeLatest(GET_TOP_RATED_TV_START, getTopRatedTVSaga);
}
