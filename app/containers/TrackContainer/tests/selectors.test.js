import { selecttrackContainerDomain, selectRepoName, selectReposData, selectReposError } from '../selectors';
import { initialState } from '../reducer';
describe('TrackContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksData;
  let tracksError;

  beforeEach(() => {
    trackName = 'mac';
    tracksData = { totalCount: 1, items: [{ trackName }] };
    tracksError = 'There was some error while fetching the tracksitory details';

    mockedState = {
      trackContainer: {
        trackName,
        tracksData,
        tracksError
      }
    };
  });
  it('should select the trackName', () => {
    const trackSelector = selectRepoName();
    expect(trackSelector(mockedState)).toEqual(trackName);
  });

  it('should select tracksData', () => {
    const tracksDataSelector = selectReposData();
    expect(tracksDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the tracksError', () => {
    const tracksErrorSelector = selectReposError();
    expect(tracksErrorSelector(mockedState)).toEqual(tracksError);
  });

  it('should select the global state', () => {
    const selector = selecttrackContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
