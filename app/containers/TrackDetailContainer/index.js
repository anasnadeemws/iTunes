import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import trackDetailContainerSaga from './saga';
import { selectTrackDetailData, selectTrackError, selectTrackDetailLoading } from './selectors';
import { trackDetailContainerCreators } from './reducer';
import { injectSaga } from 'redux-injectors';
import { Container, Skeleton } from '@mui/material';
import TrackCard from '@components/TrackCard';
import If from '@components/If';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export const TrackDetailContainer = ({
  trackDetailData,
  trackError,
  trackDetailLoading,
  dispatchTrackDetail,
  padding
}) => {
  const { trackId } = useParams();

  useEffect(() => {
    dispatchTrackDetail(trackId);
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

  return (
    <Container padding={padding}>
      <If condition={!trackDetailLoading} otherwise={renderSkeleton()}>
        {renderTrackDetail()}
      </If>
    </Container>
  );
};

TrackDetailContainer.propTypes = {
  trackDetailData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  trackError: PropTypes.string,
  trackDetailLoading: PropTypes.bool,
  dispatchTrackDetail: PropTypes.func,
  padding: PropTypes.number
};

TrackDetailContainer.defaultProps = {
  trackDetailData: {},
  trackError: null,
  trackDetailLoading: false
};

const mapStateToProps = createStructuredSelector({
  trackDetailData: selectTrackDetailData(),
  trackError: selectTrackError(),
  trackDetailLoading: selectTrackDetailLoading()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetail } = trackDetailContainerCreators;
  return {
    dispatchTrackDetail: (trackId) => dispatch(requestGetTrackDetail(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'trackDetailContainer', saga: trackDetailContainerSaga })
)(TrackDetailContainer);
