/*
 *
 * TrackDetailContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: trackDetailContainerTypes, Creators: trackDetailContainerCreators } = createActions({
  requestGetTrackDetail: ['trackId'],
  successGetTrackDetail: ['data'],
  failureGetTrackDetail: ['error']
});
export const initialState = { trackId: null, trackDetailData: {}, trackError: null, trackDetailLoading: false };

/* eslint-disable default-case, no-param-reassign */
export const trackDetailContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackDetailContainerTypes.REQUEST_GET_TRACK_DETAIL:
        draft.trackId = action.trackId;
        draft.trackDetailLoading = true;
        break;
      case trackDetailContainerTypes.SUCCESS_GET_TRACK_DETAIL:
        draft.trackDetailData = action.data;
        draft.trackDetailLoading = false;
        break;
      case trackDetailContainerTypes.FAILURE_GET_TRACK_DETAIL:
        draft.trackError = get(action.error, 'message', 'something_went_wrong');
        draft.trackDetailLoading = false;
        break;
    }
  });

export default trackDetailContainerReducer;
