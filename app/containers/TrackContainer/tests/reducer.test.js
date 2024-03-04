import { trackContainerReducer, initialState, trackContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TrackContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_ITUNES_TRACKS is dispatched', () => {
    const trackName = 'Sunflower';
    const expectedResult = { ...state, trackName, loading: true };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.REQUEST_GET_ITUNES_TRACKS,
        trackName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and loading = false when SUCCESS_GET_ITUNES_TRACKS is dispatched', () => {
    const data = { artistName: 'Post Malone' };
    const expectedResult = { ...state, tracksData: data, loading: false };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.SUCCESS_GET_ITUNES_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and loading = false when FAILURE_GET_ITUNES_TRACKS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, tracksError: error, loading: false };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.FAILURE_GET_ITUNES_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_ITUNES_TRACKS is dispatched', () => {
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.CLEAR_ITUNES_TRACKS
      })
    ).toEqual(initialState);
  });
});
