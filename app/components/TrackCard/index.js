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
    padding: 1rem;
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

  // Helpers
  const truncateWord = (word, truncateLen) => {
    if (!word) {
      return '';
    }
    return word.length > truncateLen ? `${word.substring(0, truncateLen)}...` : word;
  };

  return (
    <TrackCustomCard data-testid="track-card">
      <TrackContentBox>
        <TrackContentHeaderBox>
          <If condition={!isEmpty(previewUrl)}>
            <IconButton aria-label="play/pause" onClick={() => setPlayTrack(!playTrack)}>
              <If condition={playTrack} otherwise={<TrackPlayIcon />}>
                <TrackPauseIcon />
              </If>
            </IconButton>
          </If>
          <Typography component="div" variant="h5">
            <If
              condition={!isEmpty(collectionName)}
              otherwise={<T data-testid="collection_name_unavailable" id="collection_name_unavailable" />}
            >
              <T data-testid="collectionName" id="collection_name" values={{ collectionName: collectionName }} />
            </If>
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
          <T data-testid="track_shortdesc" id="track_shortdesc" values={{ desc: truncateWord(shortDescription, 38) }} />
        </If>
      </TrackContentBox>
      <If condition={!isEmpty(artworkUrl100)}>
        <TrackMedia component="img" image={artworkUrl100} alt="Poster unavailable" />
      </If>
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
