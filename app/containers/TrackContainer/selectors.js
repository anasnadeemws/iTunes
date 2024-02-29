import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackContainer state domain
 */

export const selectTrackContainerDomain = (state) => state.trackContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TrackContainer
 */

export const selectTracksData = () =>
  createSelector(selectTrackContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectTracksError = () =>
  createSelector(selectTrackContainerDomain, (substate) => get(substate, 'tracksError'));

export const selectTrackName = () =>
  createSelector(selectTrackContainerDomain, (substate) => get(substate, 'trackName'));

export const selectTrackLoading = () =>
  createSelector(selectTrackContainerDomain, (substate) => get(substate, 'loading'));
