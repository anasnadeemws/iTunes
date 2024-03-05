/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import homeContainerReducer from 'containers/HomeContainer/reducer';
import trackContainerReducer from './containers/TrackContainer/reducer';
import trackDetailContainerReducer from './containers/TrackDetailContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(injectedReducer = {}) {
  return combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    homeContainer: homeContainerReducer,
    trackContainer: trackContainerReducer,
    trackDetailContainer: trackDetailContainerReducer
  });
}
