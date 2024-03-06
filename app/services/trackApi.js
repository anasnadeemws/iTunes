import { generateApiClient } from '@utils/apiUtils';
const trackApi = generateApiClient('itunes');

export const getTracks = (repoName) => trackApi.get(`/search/?term=${repoName}`);

export const getTrack = (trackId) => trackApi.get(`/lookup/?id=${trackId}`);
