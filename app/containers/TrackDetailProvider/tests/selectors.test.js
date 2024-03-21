import {
  selectTrackDetailDomain,
  selectTrackDetailData,
  selectTrackError,
  selectTrackDetailLoading
} from '../selectors';
import { initialState } from '../reducer';

describe('TrackDetailContainer selector tests', () => {
  let mockedState;
  let trackDetailData;
  let trackError;
  let trackDetailLoading;

  beforeEach(() => {
    trackDetailData = { resultCount: 1, results: [] };
    trackError = 'There was some error while fetching the track details';

    mockedState = {
      trackDetailContainer: {
        trackDetailData,
        trackError,
        trackDetailLoading
      }
    };
  });

  it('should select trackDetailData', () => {
    const tracksDataSelector = selectTrackDetailData();
    expect(tracksDataSelector(mockedState)).toEqual(trackDetailData);
  });

  it('should select the trackError', () => {
    const tracksErrorSelector = selectTrackError();
    expect(tracksErrorSelector(mockedState)).toEqual(trackError);
  });

  it('should select the trackDetailLoading', () => {
    const tracksLoadingSelector = selectTrackDetailLoading();
    expect(tracksLoadingSelector(mockedState)).toEqual(trackDetailLoading);
  });

  it('should select the global state', () => {
    const selector = selectTrackDetailDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
