import request from '@src/utils/request';

export const fetchUsersAPI = ({ limit = 10, page = 0 }) =>
  request.get('/users', {
    params: {
      limit,
      page,
    },
  });
