/**
 *
 * Tests for TrackContainer
 *
 */

import React from 'react';
// import { Router } from 'react-router';
// import { useHistory } from 'react-router-dom';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { TrackContainerTest as TrackContainer, mapDispatchToProps } from '../index';
import { trackContainerTypes } from '../reducer';
// import { createBrowserHistory } from 'history';
import { translate } from '@app/utils/index';

describe('<TrackContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackContainer dispatchItunesTracks={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesTracks on empty change', async () => {
    const getGithubTracksSpy = jest.fn();
    const clearGithubTracksSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <TrackContainer dispatchClearItunesTracks={clearGithubTracksSpy} dispatchItunesTracks={getGithubTracksSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getGithubTracksSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearGithubTracksSpy).toBeCalled();
  });

  it('should call dispatchItunesTracks on change and after enter', async () => {
    const trackName = 'sunflower';
    const { getByTestId } = renderProvider(<TrackContainer dispatchItunesTracks={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: trackName }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should call dispatchItunesTracks on clicking the search icon', async () => {
    const trackName = 'sunflower';
    const { getByTestId } = renderProvider(<TrackContainer dispatchItunesTracks={submitSpy} trackName={trackName} />);
    fireEvent.click(getByTestId('search-icon'));

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should  dispatchItunesTracks on update on mount if trackName is already persisted', async () => {
    const trackName = 'sunflower';
    renderProvider(<TrackContainer trackName={trackName} tracksData={null} dispatchItunesTracks={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSearchSpy = jest.fn();
    const trackName = 'sunflower';
    const actions = {
      dispatchItunesTracks: { trackName, type: trackContainerTypes.REQUEST_GET_ITUNES_TRACKS },
      dispatchClearItunesTracks: { type: trackContainerTypes.CLEAR_ITUNES_TRACKS }
    };

    const props = mapDispatchToProps(dispatchTracksSearchSpy);
    props.dispatchItunesTracks(trackName);
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchItunesTracks);

    await timeout(500);
    props.dispatchClearItunesTracks();
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItunesTracks);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<TrackContainer tracksError={defaultError} />);
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the default message when searchBox is empty and tracksError is null', () => {
    const defaultMessage = translate('track_search_default');
    const { getByTestId } = renderProvider(<TrackContainer />);
    expect(getByTestId('default-message')).toBeInTheDocument();
    expect(getByTestId('default-message').textContent).toBe(defaultMessage);
  });

  it('should render the data when loading becomes false', () => {
    const tracksData = { results: [{ trackOne: 'sunflower' }] };
    const { getByTestId } = renderProvider(<TrackContainer tracksData={tracksData} dispatchItunesTracks={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render exact number of TrackCards as per resultCount in result', () => {
    const resultCount = 3;
    const tracksData = {
      resultCount,
      results: [
        {
          name: 'react-tempalte',
          artistName: 'wednesday-solutions/sunflower'
        },
        {
          name: 'react',
          artistName: 'wednesday-solutions/react'
        },
        {
          name: 'react-tempalte2',
          artistName: 'wednesday-solutions/sunflower2'
        }
      ]
    };
    const { getAllByTestId } = renderProvider(
      <TrackContainer tracksData={tracksData} dispatchItunesTracks={submitSpy} />
    );
    expect(getAllByTestId('track-card').length).toBe(resultCount);
  });

  // it('should redirect to /stories when clicked on Clickable component', async () => {
  //   const history = createBrowserHistory();
  //   const { getByTestId } = renderProvider(
  //     <Router history={history}>
  //       <TrackContainer />
  //     </Router>
  //   );
  //   const h = useHistory();
  //   const historySpy = jest.spyOn(h, 'push');
  //   fireEvent.click(getByTestId('redirect'));
  //   await timeout(500);
  //   expect(historySpy).toHaveBeenCalledWith('/stories');
  // });

  // it('should render Skeleton Comp when "loading" is true', async () => {
  //   const trackName = 'some track';
  //   const { getByTestId, getAllByTestId } = renderProvider(
  //     <TrackContainer dispatchItunesTracks={submitSpy} trackName={trackName} />
  //   );
  //   fireEvent.change(getByTestId('search-bar'), { target: { value: trackName } });
  //   await timeout(500);
  //   expect(getAllByTestId('skeleton').length).toBe(3);
  // });
});
