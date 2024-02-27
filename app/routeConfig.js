import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import TrackContainer from '@containers/TrackContainer/Loadable';
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
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
