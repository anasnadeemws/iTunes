import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackDetailContainer state domain
 */

export const selectTrackDetailDomain = (state) => state.trackDetailContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by trackDetailContainer
 */

export const selectTrackDetailData = () =>
  createSelector(selectTrackDetailDomain, (substate) => get(substate, 'trackDetailData'));

export const selectTrackError = () =>
  createSelector(selectTrackDetailDomain, (substate) => get(substate, 'trackError'));

export const selectTrackDetailLoading = () =>
  createSelector(selectTrackDetailDomain, (substate) => get(substate, 'trackDetailLoading'));
