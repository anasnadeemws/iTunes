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
import For from '@components/For';
import RepoCard from '@components/RepoCard';
import colors from '@app/themes/colors';
import { selectReposData, selectReposError, selectRepoName } from './selectors';
import { trackContainerCreators } from './reducer';
import trackContainerSaga from './saga';
import { translate } from '@app/utils/index';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
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
    max-width: ${(props) => props.maxwidth}px;
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
  padding
}) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loaded = get(tracksData, 'results', null) || tracksError;
    if (loaded) {
      setLoading(false);
    }
  }, [tracksData]);

  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchItunesTracks(trackName);
      setLoading(true);
    }
  }, []);

  const searchRepos = (rName) => {
    dispatchItunesTracks(rName);
    setLoading(true);
  };

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      searchRepos(rName);
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

  const renderRepoList = () => {
    const results = get(tracksData, 'results', []);
    const resultCount = get(tracksData, 'resultCount', 0);
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
              <For
                of={results}
                ParentComponent={Container}
                renderItem={(item, index) => <RepoCard key={index} {...item} />}
              />
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
    <Container maxwidth={maxwidth} padding={padding}>
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
                onClick={() => searchRepos(trackName)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
      {renderRepoList()}
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
  padding: PropTypes.number
};

TrackContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  tracksData: {},
  tracksError: null
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectReposData(),
  tracksError: selectReposError(),
  trackName: selectRepoName()
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

export const trackContainerTest = compose()(TrackContainer);
