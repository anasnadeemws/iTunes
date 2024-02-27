import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos } from '@services/trackApi';
import { trackContainerTypes, trackContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES_TRACKS } = trackContainerTypes;
const { successGetItunesTracks, failureGetItunesTracks } = trackContainerCreators;
export function* getItunesTracks(action) {
  const response = yield call(getRepos, action.trackName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesTracks(data));
  } else {
    yield put(failureGetItunesTracks(data));
  }
}
// Individual exports for testing
export default function* trackContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_TRACKS, getItunesTracks);
}
