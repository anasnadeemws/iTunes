import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import TrackContainer from '@containers/TrackContainer/Loadable';
import TrackDetailContainer from '@containers/TrackDetailContainer/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  tracks: {
    component: TrackContainer,
    ...routeConstants.tracks
  },
  track: {
    component: TrackDetailContainer,
    ...routeConstants.track
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
