/*
 *
 * TrackContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: trackContainerTypes, Creators: trackContainerCreators } = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: {}
});
export const initialState = { repoName: null, reposData: {}, reposError: null };

/* eslint-disable default-case, no-param-reassign */
export const trackContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackContainerTypes.REQUEST_GET_GITHUB_REPOS:
        draft.repoName = action.repoName;
        break;
      case trackContainerTypes.CLEAR_GITHUB_REPOS:
        draft.repoName = null;
        draft.reposError = null;
        draft.reposData = {};
        break;
      case trackContainerTypes.SUCCESS_GET_GITHUB_REPOS:
        draft.reposData = action.data;
        break;
      case trackContainerTypes.FAILURE_GET_GITHUB_REPOS:
        draft.reposError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default trackContainerReducer;
