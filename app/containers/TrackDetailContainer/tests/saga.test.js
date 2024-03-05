/**
 * Test TrackDetailContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTrack } from '@services/trackApi';
import { apiResponseGenerator } from '@utils/testUtils';
import trackDetailContainerSaga, { getTrackDetail } from '../saga';
import { trackDetailContainerTypes } from '../reducer';

describe('TrackDetailContainer saga tests', () => {
  const generator = trackDetailContainerSaga();
  const trackId = 12323;
  let getTracksGenerator = getTrackDetail({ trackId });

  it('should start task to watch for REQUEST_GET_TRACK_DETAIL action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(trackDetailContainerTypes.REQUEST_GET_TRACK_DETAIL, getTrackDetail)
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAIL is dispatched when the api call fails', () => {
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTrack, trackId));
    const errorResponse = {
      errorMessage: 'There was an error while fetching track informations.'
    };
    expect(getTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackDetailContainerTypes.FAILURE_GET_TRACK_DETAIL,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAIL is dispatched when the api call succeeds', () => {
    getTracksGenerator = getTrackDetail({ trackId });
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTrack, trackId));
    const tracksResponse = {
      resultCount: 1,
      results: [{ artistName: 'Post Malone' }]
    };
    expect(getTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: trackDetailContainerTypes.SUCCESS_GET_TRACK_DETAIL,
        data: tracksResponse
      })
    );
  });
});
