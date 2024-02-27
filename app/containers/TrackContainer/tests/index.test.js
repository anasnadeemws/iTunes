/**
 *
 * Tests for TrackContainer
 *
 */

import React from 'react';
import { Router } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { trackContainerTest as TrackContainer, mapDispatchToProps } from '../index';
import { trackContainerTypes } from '../reducer';
import { createBrowserHistory } from 'history';
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
    const getItunesTracksSpy = jest.fn();
    const clearItunesTracksSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <TrackContainer dispatchClearItunesTracks={clearItunesTracksSpy} dispatchItunesTracks={getItunesTracksSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesTracksSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesTracksSpy).toBeCalled();
  });

  it('should call dispatchItunesTracks on change and after enter', async () => {
    const trackName = 'react-template';
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
    const trackName = 'react-template';
    const { getByTestId } = renderProvider(<TrackContainer dispatchItunesTracks={submitSpy} trackName={trackName} />);
    fireEvent.click(getByTestId('search-icon'));

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should  dispatchItunesTracks on update on mount if trackName is already persisted', async () => {
    const trackName = 'react-template';
    renderProvider(<TrackContainer trackName={trackName} tracksData={null} dispatchItunesTracks={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchReposSearchSpy = jest.fn();
    const trackName = 'react-template';
    const actions = {
      dispatchItunesTracks: { trackName, type: trackContainerTypes.REQUEST_GET_ITUNES_TRACKS },
      dispatchClearItunesTracks: { type: trackContainerTypes.CLEAR_ITUNES_TRACKS }
    };

    const props = mapDispatchToProps(dispatchReposSearchSpy);
    props.dispatchItunesTracks(trackName);
    expect(dispatchReposSearchSpy).toHaveBeenCalledWith(actions.dispatchItunesTracks);

    await timeout(500);
    props.dispatchClearItunesTracks();
    expect(dispatchReposSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItunesTracks);
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
    const tracksData = { items: [{ trackOne: 'react-template' }] };
    const { getByTestId } = renderProvider(<TrackContainer tracksData={tracksData} dispatchItunesTracks={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render exact number of RepoCards as per totalCount in result', () => {
    const totalCount = 3;
    const tracksData = {
      totalCount,
      items: [
        {
          name: 'react-tempalte',
          fullName: 'wednesday-solutions/react-template',
          stargazersCount: 200
        },
        {
          name: 'react',
          fullName: 'wednesday-solutions/react',
          stargazersCount: 100
        },
        {
          name: 'react-tempalte2',
          fullName: 'wednesday-solutions/react-template2',
          stargazersCount: 300
        }
      ]
    };
    const { getAllByTestId } = renderProvider(<TrackContainer tracksData={tracksData} dispatchItunesTracks={submitSpy} />);
    expect(getAllByTestId('track-card').length).toBe(totalCount);
  });

  it('should redirect to /stories when clicked on Clickable component', async () => {
    const history = createBrowserHistory();
    const { getByTestId } = renderProvider(
      <Router history={history}>
        <TrackContainer />
      </Router>
    );
    const h = useHistory();
    const historySpy = jest.spyOn(h, 'push');
    fireEvent.click(getByTestId('redirect'));
    await timeout(500);
    expect(historySpy).toHaveBeenCalledWith('/stories');
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const trackName = 'some track';
    const { getByTestId, getAllByTestId } = renderProvider(
      <TrackContainer dispatchItunesTracks={submitSpy} trackName={trackName} />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: trackName } });
    await timeout(500);
    expect(getAllByTestId('skeleton').length).toBe(3);
  });
});
