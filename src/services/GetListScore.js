import * as request from '~/utils/request';

export const getListScore = async (q) => {
  try {
    const res = await request.getAll('api/UserRank/GetListUserScore', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
