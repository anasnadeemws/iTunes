/**
 * Test trackContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTracks } from '@services/trackApi';
import { apiResponseGenerator } from '@utils/testUtils';
import trackContainerSaga, { getItunesTracks } from '../saga';
import { trackContainerTypes } from '../reducer';

describe('TrackContainer saga tests', () => {
  const generator = trackContainerSaga();
  const trackName = 'mac';
  let getTracksGenerator = getItunesTracks({ trackName });

  it('should start task to watch for REQUEST_GET_ITUNES_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackContainerTypes.REQUEST_GET_ITUNES_TRACKS, getItunesTracks));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_TRACKS is dispatched when the api call fails', () => {
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching track informations.'
    };
    expect(getTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackContainerTypes.FAILURE_GET_ITUNES_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_TRACKS is dispatched when the api call succeeds', () => {
    getTracksGenerator = getItunesTracks({ trackName });
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const tracksResponse = {
      resultCount: 1,
      results: [{ tracksitoryName: trackName }]
    };
    expect(getTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: trackContainerTypes.SUCCESS_GET_ITUNES_TRACKS,
        data: tracksResponse
      })
    );
  });
});
