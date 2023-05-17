import * as request from '~/utils/request';

export const getAllListenCompetently = async (q) => {
  try {
    const res = await request.getAll('api/UserListen/GetAllListenCompetently', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
