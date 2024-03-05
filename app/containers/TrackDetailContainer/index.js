import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import trackDetailContainerSaga from './saga';
import { selectTrackDetailData, selectTrackError, selectTrackDetailLoading } from './selectors';
import { trackDetailContainerCreators } from './reducer';
import { injectSaga } from 'redux-injectors';
import { Card, IconButton, Skeleton, InputAdornment, OutlinedInput, CardHeader, Divider } from '@mui/material';

export const TrackDetailContainer = ({ trackDetailData, trackError, trackDetailLoading, dispatchTrackDetail }) => {
  const { trackId } = useParams();
  console.log('trackId', trackId);
  return <div>TrackDetailContainer {trackId} </div>;
};

TrackDetailContainer.propTypes = {
  trackDetailData: PropTypes.object,
  trackError: PropTypes.string,
  trackDetailLoading: PropTypes.bool,
  dispatchTrackDetail: PropTypes.func
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
