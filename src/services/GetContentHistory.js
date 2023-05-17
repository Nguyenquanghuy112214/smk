import * as request from '~/utils/request';

export const getContentHistory = async (q, r) => {
  try {
    const res = await request.getAll('api/UserHistory/ContentHistoryByUser', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
