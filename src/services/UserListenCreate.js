import * as request from '~/utils/request';

export const userListenCreate = async (q, r) => {
  try {
    const res = await request.post(`api/UserListen/Create`, q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
