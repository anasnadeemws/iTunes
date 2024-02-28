/**
 *
 * TrackCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import T from '@components/T';
import If from '@components/If';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function TrackCard({ collectionName, artistName, shortDescription, artworkUrl100 }) {
  return (
    <Card
      sx={{
        display: 'flex',
        margin: '1rem',
        width: '32rem',
        justifyContent: 'space-between',
        ':hover': {
          boxShadow: 5
        },
        transition: 'all .25s linear'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 32, width: 32 }} />
            </IconButton>
            <Typography component="div" variant="h5">
              {collectionName.length > 18 ? `${collectionName.substring(0, 18)}...` : collectionName}
            </Typography>
          </Box>
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
            <T data-testid="track_shortdesc" id="track_shortdesc" values={{ desc: shortDescription }} />
          </If>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={artworkUrl100} alt="Live from space album cover" />
    </Card>
  );
}

TrackCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  shortDescription: PropTypes.string
};

export default TrackCard;
