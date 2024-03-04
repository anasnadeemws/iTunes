import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { injectSaga } from 'redux-injectors';
import { Card, IconButton, Skeleton, InputAdornment, OutlinedInput, CardHeader, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import If from '@components/If';
import TrackCard from '@components/TrackCard';
import colors from '@app/themes/colors';
import { selectTracksData, selectTracksError, selectTrackName, selectTrackLoading } from './selectors';
import { trackContainerCreators } from './reducer';
import trackContainerSaga from './saga';
import { translate } from '@app/utils/index';

// Custom Styling
const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const TrackResultsContainer = styled(Card)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
const StyledT = styled(T)`
  && {
    color: ${colors.gotoStories};
  }
`;
const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

export function TrackContainer({
  dispatchItunesTracks,
  dispatchClearItunesTracks,
  tracksData,
  tracksError,
  trackName,
  maxwidth,
  padding,
  loading
}) {
  const history = useHistory();

  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchItunesTracks(trackName);
    }
  }, []);

  const searchTracks = (tName) => {
    dispatchItunesTracks(tName);
  };

  const handleOnChange = (tName) => {
    if (!isEmpty(tName)) {
      searchTracks(tName);
    } else {
      dispatchClearItunesTracks();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      </>
    );
  };

  const renderTrackList = () => {
    const results = get(tracksData, 'results', []);
    const resultCount = get(tracksData, 'resultCount', 0);
    const [trackPlaying, setTrackPlaying] = useState('');

    return (
      <If condition={!isEmpty(results) || loading}>
        <CustomCard>
          <If condition={!loading} otherwise={renderSkeleton()}>
            <>
              <If condition={!isEmpty(trackName)}>
                <div>
                  <T id="search_query" values={{ trackName }} />
                </div>
              </If>
              <If condition={resultCount !== 0}>
                <div>
                  <T id="matching_tracks" values={{ resultCount }} />
                </div>
              </If>
              <TrackResultsContainer>
                {results.map((item, index) => (
                  <TrackCard key={index} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} {...item} />
                ))}
              </TrackResultsContainer>
              <If condition={!isEmpty(trackPlaying)}>
                <audio data-testid="audio" name="media" key={trackPlaying} autoPlay>
                  <source src={trackPlaying} />
                </audio>
              </If>
            </>
          </If>
        </CustomCard>
      </If>
    );
  };

  const renderErrorState = () => {
    let trackError;
    if (tracksError) {
      trackError = tracksError;
    } else if (isEmpty(trackName)) {
      trackError = 'track_search_default';
    }
    return (
      !loading &&
      trackError && (
        <CustomCard color={tracksError ? 'red' : 'grey'}>
          <CustomCardHeader title={translate('track_list')} />
          <Divider sx={{ mb: 1.25 }} light />
          <If condition={tracksError} otherwise={<T data-testid="default-message" id={trackError} />}>
            <T data-testid="error-message" text={tracksError} />
          </If>
        </CustomCard>
      )
    );
  };

  const handleStoriesClick = () => {
    history.push('/stories');
    window.location.reload();
  };

  return (
    <Container padding={padding}>
      <RightContent>
        <StyledT onClick={handleStoriesClick} data-testid="redirect" id="stories" />
      </RightContent>
      <CustomCard maxwidth={maxwidth}>
        <CustomCardHeader title={translate('track_search')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T marginBottom={10} id="get_track_details" />
        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          onChange={(event) => debouncedHandleOnChange(event.target.value)}
          fullWidth
          defaultValue={trackName}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-icon"
                aria-label="search tracks"
                type="button"
                onClick={() => searchTracks(trackName)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
      {renderTrackList()}
      {renderErrorState()}
    </Container>
  );
}

TrackContainer.propTypes = {
  dispatchItunesTracks: PropTypes.func,
  dispatchClearItunesTracks: PropTypes.func,
  intl: PropTypes.object,
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  tracksError: PropTypes.string,
  trackName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  loading: PropTypes.bool
};

TrackContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  tracksData: {},
  tracksError: null,
  loading: false
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectTracksData(),
  tracksError: selectTracksError(),
  trackName: selectTrackName(),
  loading: selectTrackLoading()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItunesTracks, clearItunesTracks } = trackContainerCreators;
  return {
    dispatchItunesTracks: (trackName) => dispatch(requestGetItunesTracks(trackName)),
    dispatchClearItunesTracks: () => dispatch(clearItunesTracks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'trackContainer', saga: trackContainerSaga })
)(TrackContainer);

export const TrackContainerTest = compose()(TrackContainer);
