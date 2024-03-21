import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { injectSaga } from 'redux-injectors';
import { Card, CardHeader, Container, Divider, Skeleton } from '@mui/material';
import TrackCard from '@components/TrackCard';
import If from '@components/If';
import T from '@components/T';
import get from 'lodash/get';
import { translate } from '@app/utils/index';
import trackDetailSaga from '../TrackDetailProvider/saga';
import { selectTrackDetailData, selectTrackError, selectTrackDetailLoading } from '../TrackDetailProvider/selectors';
import { trackDetailCreators } from '../TrackDetailProvider/reducer';
import { selectTracksData } from '../TrackContainer/selectors';

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
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;

export const TrackDetailContainer = ({
  tracksData,
  trackDetailData,
  trackError,
  trackDetailLoading,
  dispatchTrackDetail,
  dispatchTrackDetailData,
  padding
}) => {
  const { trackId } = useParams();

  useEffect(() => {
    const trackDataResults = get(tracksData, 'results', []);
    const data = trackDataResults.find((track) => {
      return track.collectionId == trackId;
    });
    if (isEmpty(data)) {
      dispatchTrackDetail(trackId);
    } else {
      dispatchTrackDetailData({ results: [data] });
    }
    // dispatchTrackDetail(trackId);
  }, []);

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      </>
    );
  };

  const renderTrackDetail = () => {
    const trackData = get(trackDetailData, 'results', [])[0];
    const [trackPlaying, setTrackPlaying] = useState('');

    return (
      <>
        <TrackCard trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} {...trackData} />
        <If condition={!isEmpty(trackPlaying)}>
          <audio data-testid="audio" name="media" key={trackPlaying} autoPlay>
            <source src={trackPlaying} />
          </audio>
        </If>
      </>
    );
  };

  const renderErrorState = () => {
    let trackDetailError;
    if (trackError) {
      trackDetailError = trackError;
    }
    return (
      !trackDetailLoading &&
      trackDetailError && (
        <CustomCard color={trackDetailError ? 'red' : 'grey'}>
          <CustomCardHeader title={translate('track_list')} />
          <Divider sx={{ mb: 1.25 }} light />
          <If condition={trackDetailError} otherwise={<T data-testid="default-message" id={trackDetailError} />}>
            <T data-testid="error-message" text={trackDetailError} />
          </If>
        </CustomCard>
      )
    );
  };

  return (
    <Container padding={padding}>
      <If condition={!trackDetailLoading} otherwise={renderSkeleton()}>
        {renderTrackDetail()}
      </If>
      {renderErrorState()}
    </Container>
  );
};

TrackDetailContainer.propTypes = {
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  trackDetailData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  trackError: PropTypes.string,
  trackDetailLoading: PropTypes.bool,
  dispatchTrackDetail: PropTypes.func,
  dispatchTrackDetailData: PropTypes.func,
  padding: PropTypes.number
};

TrackDetailContainer.defaultProps = {
  trackDetailData: {},
  trackError: null,
  trackDetailLoading: false
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectTracksData(),
  trackDetailData: selectTrackDetailData(),
  trackError: selectTrackError(),
  trackDetailLoading: selectTrackDetailLoading()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetail, successGetTrackDetail } = trackDetailCreators;
  return {
    dispatchTrackDetail: (trackId) => dispatch(requestGetTrackDetail(trackId)),
    dispatchTrackDetailData: (data) => dispatch(successGetTrackDetail(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'trackDetailContainer', saga: trackDetailSaga })
)(TrackDetailContainer);

export const TrackDetailContainerTest = compose()(TrackDetailContainer);
