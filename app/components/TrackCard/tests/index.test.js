/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import TrackCard from '../index';
import { translate } from '@app/utils/index';

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const mockSetTrackPlaying = jest.fn();
    const { baseElement } = renderWithIntl(<TrackCard setTrackPlaying={mockSetTrackPlaying} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const mockSetTrackPlaying = jest.fn();
    const { getAllByTestId } = renderWithIntl(<TrackCard setTrackPlaying={mockSetTrackPlaying} />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });

  it('should render the track details inside the card', () => {
    const mockSetTrackPlaying = jest.fn();
    const trackData = {
      collectionName: 'Sunflower',
      artistName: 'Post Malone',
      shortDescription: 'Sample Description',
      artworkUrl100: 'https://example.com/image.jpg',
      previewUrl: 'https://example.com/preview.mp3'
    };
    const { getByTestId } = renderWithIntl(<TrackCard setTrackPlaying={mockSetTrackPlaying} {...trackData} />);

    expect(getByTestId('collectionName')).toHaveTextContent(trackData.collectionName);
    expect(getByTestId('artistName')).toHaveTextContent(trackData.artistName);
    expect(getByTestId('track_shortdesc')).toHaveTextContent(trackData.shortDescription);
  });

  it('should render the track unavailable messages in case any props are unavailable or have falsy values', () => {
    const mockSetTrackPlaying = jest.fn();
    const collectionNameUnavailable = translate('collection_name_unavailable');
    const artistNameUnavailable = translate('track_artist_name_unavailable');
    const shortDescriptionUnavailable = translate('track_shortdesc_unavailable');

    const { getByTestId } = renderWithIntl(<TrackCard setTrackPlaying={mockSetTrackPlaying} />);
    expect(getByTestId('collection_name_unavailable')).toHaveTextContent(collectionNameUnavailable);
    expect(getByTestId('track_artist_name_unavailable')).toHaveTextContent(artistNameUnavailable);
    expect(getByTestId('track_shortdesc_unavailable')).toHaveTextContent(shortDescriptionUnavailable);
  });
});
