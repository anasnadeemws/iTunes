/**
 *
 * Tests for TrackDetailContainer
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { TrackDetailContainerTest as TrackDetailContainer, mapDispatchToProps } from '../index';
import { translate } from '@app/utils/index';
import { trackDetailTypes } from '@app/containers/TrackDetailProvider/reducer';

describe('<TrackDetailContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailContainer dispatchTrackDetail={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSearchSpy = jest.fn();
    const trackId = 12323;
    const actions = {
      dispatchTrackDetail: { trackId, type: trackDetailTypes.REQUEST_GET_TRACK_DETAIL }
    };

    const props = mapDispatchToProps(dispatchTracksSearchSpy);
    props.dispatchTrackDetail(trackId);
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchTrackDetail);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(
      <TrackDetailContainer trackError={defaultError} dispatchTrackDetail={submitSpy} />
    );
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });
});
