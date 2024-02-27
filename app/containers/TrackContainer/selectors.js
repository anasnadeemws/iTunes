import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackContainer state domain
 */

export const selecttrackContainerDomain = (state) => state.trackContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TrackContainer
 */

export const selectReposData = () =>
  createSelector(selecttrackContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectReposError = () =>
  createSelector(selecttrackContainerDomain, (substate) => get(substate, 'tracksError'));

export const selectRepoName = () => createSelector(selecttrackContainerDomain, (substate) => get(substate, 'trackName'));
