import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackDetailContainer state domain
 */

export const selectTrackDetailContainerDomain = (state) => state.trackDetailContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by trackDetailContainer
 */

export const selectTracksData = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectTracksError = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'tracksError'));

export const selectTrackName = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'trackName'));

export const selectTrackLoading = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'loading'));
