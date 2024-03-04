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
    const { baseElement } = renderWithIntl(<TrackCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });

  it('should render the track details inside the card', () => {
    const collectionName = 'Sunflower';
    const artistName = 'Post Malone';
    const shortDescription = '';
    const artworkUrl100 = 'https://someurl.com';
    const previewUrl = '';
    const { getByTestId } = renderWithIntl(
      <TrackCard
        collectionName={collectionName}
        artistName={artistName}
        shortDescription={shortDescription}
        artworkUrl100={artworkUrl100}
        previewUrl={previewUrl}
      />
    );
    expect(getByTestId('collectionName')).toHaveTextContent(collectionName);
  });

  it('should render the track unavailable messages in case any props are unavailable or have falsy values', () => {
    const collectionNameUnavailable = translate('collection_name_unavailable');
    const artistNameUnavailable = translate('track_artist_name_unavailable');
    const shortDescriptionUnavailable = translate('track_shortdesc_unavailable');
    const { getByTestId } = renderWithIntl(<TrackCard />);
    expect(getByTestId('collection_name_unavailable')).toHaveTextContent(collectionNameUnavailable);
    expect(getByTestId('track_artist_name_unavailable')).toHaveTextContent(artistNameUnavailable);
    expect(getByTestId('track_shortdesc_unavailable')).toHaveTextContent(shortDescriptionUnavailable);
  });
});
