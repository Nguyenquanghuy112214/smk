import * as request from '~/utils/request';

export const createScore = async (q, r) => {
  try {
    const res = await request.post('api/UserScore/CreateUserScore', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
