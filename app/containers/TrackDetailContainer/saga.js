import { put, call, takeLatest } from 'redux-saga/effects';
import { getTrack } from '@services/trackApi';
import { trackDetailContainerTypes, trackDetailContainerCreators } from './reducer';

const { REQUEST_GET_TRACK_DETAIL } = trackDetailContainerTypes;
const { successGetTrackDetail, failureGetTrackDetail } = trackDetailContainerCreators;
export function* getTrackDetail(action) {
  const response = yield call(getTrack, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackDetail(data));
  } else {
    yield put(failureGetTrackDetail(data));
  }
}
// Individual exports for testing
export default function* trackDetailContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DETAIL, getTrackDetail);
}
