/**
 *
 * TrackCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import styled from '@emotion/styled';
import T from '@components/T';
import If from '@components/If';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const TrackCustomCard = styled(Card)`
  && {
    display: flex;
    margin: 1rem;
    width: 32rem;
    justify-content: space-between;
    :hover {
      box-shadow: 5;
    }
    transition: all 0.25s linear;
  }
`;

const TrackContentBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
  }
`;

const TrackMedia = styled(CardMedia)`
  && {
    width: 10rem;
  }
`;

const TrackContentHeaderBox = styled(TrackContentBox)`
  && {
    flex-direction: row;
    align-items: center;
    padding-bottom: 1rem;
  }
`;

const TrackPauseIcon = styled(PauseIcon)`
  && {
    height: 2rem;
    width: 2rem;
  }
`;

const TrackPlayIcon = styled(PlayArrowIcon)`
  && {
    height: 2rem;
    width: 2rem;
  }
`;

export function TrackCard({ collectionName, artistName, shortDescription, artworkUrl100, previewUrl }) {
  const [playTrack, setPlayTrack] = useState(false);
  const shortDesc =
    shortDescription && shortDescription.length > 38 ? `${shortDescription.substring(0, 38)}...` : shortDescription;

  return (
    <TrackCustomCard>
      <TrackContentBox>
        <CardContent>
          <TrackContentHeaderBox>
            <If condition={!isEmpty(previewUrl)}>
              <IconButton aria-label="play/pause" onClick={() => setPlayTrack(!playTrack)}>
                <If condition={playTrack} otherwise={<TrackPlayIcon />}>
                  <TrackPauseIcon />
                </If>
              </IconButton>
            </If>
            <Typography component="div" variant="h5">
              {collectionName && collectionName.length > 18 ? `${collectionName.substring(0, 18)}...` : collectionName}
            </Typography>
          </TrackContentHeaderBox>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <If
              condition={!isEmpty(artistName)}
              otherwise={<T data-testid="track_artist_name_unavailable" id="track_artist_name_unavailable" />}
            >
              <T data-testid="artistName" id="track_artist_name" values={{ artistName: artistName }} />
            </If>
          </Typography>
          <If
            condition={!isEmpty(shortDescription)}
            otherwise={<T data-testid="track_shortdesc_unavailable" id="track_shortdesc_unavailable" />}
          >
            <T data-testid="track_shortdesc" id="track_shortdesc" values={{ desc: shortDesc }} />
          </If>
        </CardContent>
      </TrackContentBox>
      <TrackMedia component="img" image={artworkUrl100} alt={collectionName} />
      <If condition={playTrack}>
        <audio autoPlay name="media">
          <source src={previewUrl} />
        </audio>
      </If>
    </TrackCustomCard>
  );
}

TrackCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  shortDescription: PropTypes.string,
  previewUrl: PropTypes.string
};

export default TrackCard;
