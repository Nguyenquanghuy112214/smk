import * as request from '~/utils/request';

export const getAllListenMaster = async (q) => {
  try {
    const res = await request.getAll('api/UserListen/GetAllListenMaster', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
