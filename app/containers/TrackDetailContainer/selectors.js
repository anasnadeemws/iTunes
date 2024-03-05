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

export const selectTrackDetailData = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'trackDetailData'));

export const selectTrackError = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'trackError'));

export const selectTrackDetailLoading = () =>
  createSelector(selectTrackDetailContainerDomain, (substate) => get(substate, 'loading'));
