/*
 *
 * TrackContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: trackContainerTypes, Creators: trackContainerCreators } = createActions({
  requestGetItunesTracks: ['trackName'],
  successGetItunesTracks: ['data'],
  failureGetItunesTracks: ['error'],
  clearItunesTracks: {}
});
export const initialState = { trackName: null, tracksData: {}, tracksError: null, loading: false };

/* eslint-disable default-case, no-param-reassign */
export const trackContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackContainerTypes.REQUEST_GET_ITUNES_TRACKS:
        draft.trackName = action.trackName;
        draft.loading = true;
        break;
      case trackContainerTypes.CLEAR_ITUNES_TRACKS:
        draft.trackName = null;
        draft.tracksError = null;
        draft.tracksData = {};
        draft.loading = false;
        break;
      case trackContainerTypes.SUCCESS_GET_ITUNES_TRACKS:
        draft.tracksData = action.data;
        draft.loading = false;
        break;
      case trackContainerTypes.FAILURE_GET_ITUNES_TRACKS:
        draft.tracksError = get(action.error, 'message', 'something_went_wrong');
        draft.loading = false;
        break;
    }
  });

export default trackContainerReducer;
