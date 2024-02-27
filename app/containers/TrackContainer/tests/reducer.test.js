import { trackContainerReducer, initialState, trackContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const repoName = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, repoName };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.REQUEST_GET_GITHUB_REPOS,
        repoName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, reposData: data };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.SUCCESS_GET_GITHUB_REPOS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, reposError: error };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.FAILURE_GET_GITHUB_REPOS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_GITHUB_REPOS is dispatched', () => {
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.CLEAR_GITHUB_REPOS
      })
    ).toEqual(initialState);
  });
});
