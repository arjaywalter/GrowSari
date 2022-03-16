import {call, put, takeLatest} from 'redux-saga/effects';
import Actions from '../actions';
import {fetchProductsApi} from '../api/Api';

function* fetchApi(action) {
  try {
    const data = yield call(fetchProductsApi, action);
    yield put({type: Actions.FETCH_SUCCESS, data: data});
  } catch (e) {
    yield put({type: Actions.FETCH_FAIL, message: e.message});
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* baseSaga() {
  yield takeLatest(Actions.FETCH_REQUEST, fetchApi);
}
