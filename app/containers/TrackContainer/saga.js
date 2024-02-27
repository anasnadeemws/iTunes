import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { trackContainerTypes, trackContainerCreators } from './reducer';

const { REQUEST_GET_GITHUB_REPOS } = trackContainerTypes;
const { successGetGithubRepos, failureGetGithubRepos } = trackContainerCreators;
export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}
// Individual exports for testing
export default function* trackContainerSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
}
