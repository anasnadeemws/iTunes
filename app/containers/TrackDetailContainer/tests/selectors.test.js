import {
  selectTrackContainerDomain,
  selectTrackName,
  selectTracksData,
  selectTracksError,
  selectTrackLoading
} from '../selectors';
import { initialState } from '../reducer';

describe('TrackContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksData;
  let tracksError;
  let loading;

  beforeEach(() => {
    trackName = 'mac';
    tracksData = { resultCount: 1, results: [{ trackName }] };
    tracksError = 'There was some error while fetching the tracksitory details';

    mockedState = {
      trackContainer: {
        trackName,
        tracksData,
        tracksError,
        loading
      }
    };
  });
  it('should select the trackName', () => {
    const trackSelector = selectTrackName();
    expect(trackSelector(mockedState)).toEqual(trackName);
  });

  it('should select tracksData', () => {
    const tracksDataSelector = selectTracksData();
    expect(tracksDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the tracksError', () => {
    const tracksErrorSelector = selectTracksError();
    expect(tracksErrorSelector(mockedState)).toEqual(tracksError);
  });

  it('should select the loading', () => {
    const tracksLoadingSelector = selectTrackLoading();
    expect(tracksLoadingSelector(mockedState)).toEqual(loading);
  });

  it('should select the global state', () => {
    const selector = selectTrackContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
