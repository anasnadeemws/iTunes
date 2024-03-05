import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { trackDetailContainerCreators } from './reducer';
import { injectSaga } from 'redux-injectors';
import { Card, CardHeader, Container, Divider, Skeleton } from '@mui/material';
import TrackCard from '@components/TrackCard';
import If from '@components/If';
import T from '@components/T';
import get from 'lodash/get';
import trackDetailContainerSaga from './saga';
import { selectTrackDetailData, selectTrackError, selectTrackDetailLoading } from './selectors';
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
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;

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

export const TrackDetailContainerTest = compose()(TrackDetailContainer);
