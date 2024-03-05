export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  tracks: {
    route: '/tracks',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  track: {
    route: '/track:trackid',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
