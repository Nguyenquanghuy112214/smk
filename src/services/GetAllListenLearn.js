import * as request from '~/utils/request';

export const getAllListenLearn = async (q) => {
  try {
    const res = await request.getAll('api/UserListen/GetAllListenLearn', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
