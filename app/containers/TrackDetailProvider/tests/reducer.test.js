import { trackDetailReducer, initialState, trackDetailTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TrackDetailContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackDetailReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_TRACK_DETAIL is dispatched', () => {
    const trackId = 'Sunflower';
    const expectedResult = { ...state, trackId, trackDetailLoading: true };
    expect(
      trackDetailReducer(state, {
        type: trackDetailTypes.REQUEST_GET_TRACK_DETAIL,
        trackId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and loading = false when SUCCESS_GET_TRACK_DETAIL is dispatched', () => {
    const data = { artistName: 'Post Malone' };
    const expectedResult = { ...state, trackDetailData: data, trackDetailLoading: false };
    expect(
      trackDetailReducer(state, {
        type: trackDetailTypes.SUCCESS_GET_TRACK_DETAIL,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and loading = false when FAILURE_GET_ITUNES_TRACKS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackError: error, trackDetailLoading: false };
    expect(
      trackDetailReducer(state, {
        type: trackDetailTypes.FAILURE_GET_TRACK_DETAIL,
        error
      })
    ).toEqual(expectedResult);
  });
});
