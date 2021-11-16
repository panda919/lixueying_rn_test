import request from '@src/utils/request';

export const fetchFeaturesAPI = ({ limit = 10, page = 0 }) =>
  request.get('/features', {
    params: {
      limit,
      page,
    },
  });
