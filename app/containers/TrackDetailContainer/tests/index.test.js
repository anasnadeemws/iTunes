/**
 *
 * Tests for TrackDetailContainer
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { TrackDetailContainerTest as TrackDetailContainer, mapDispatchToProps } from '../index';
import { trackContainerTypes } from '../reducer';
import { translate } from '@app/utils/index';

describe('<TrackDetailContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailContainer dispatchTrackDetail={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  // it('should  dispatchTrackDetail on update on mount if trackId is already persisted', async () => {
  //   const trackId = 12323;
  //   renderProvider(<TrackDetailContainer trackId={trackId} tracksData={null} dispatchTrackDetail={submitSpy} />);

  //   await timeout(500);
  //   expect(submitSpy).toBeCalledWith(trackId);
  // });

  // it('should validate mapDispatchToProps actions', async () => {
  //   const dispatchTracksSearchSpy = jest.fn();
  //   const trackId = 12323;
  //   const actions = {
  //     dispatchTrackDetail: { trackId, type: trackContainerTypes.REQUEST_GET_TRACK_DETAIL },
  //   };

  //   const props = mapDispatchToProps(dispatchTracksSearchSpy);
  //   props.dispatchTrackDetail(trackId);
  //   expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchTrackDetail);

  // });

  // it('should render default error message when search goes wrong', () => {
  //   const defaultError = translate('something_went_wrong');
  //   const { getByTestId } = renderProvider(<TrackDetailContainer tracksError={defaultError} />);
  //   expect(getByTestId('error-message')).toBeInTheDocument();
  //   expect(getByTestId('error-message').textContent).toBe(defaultError);
  // });

});
