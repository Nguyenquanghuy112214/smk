import * as request from '~/utils/request';

export const getRankByDate = async (q) => {
  try {
    const res = await request.post('api/UserRank/GetDataByDate', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
