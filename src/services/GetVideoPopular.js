import * as request from '~/utils/request';

export const getVideoPopular = async (q, r) => {
  try {
    const res = await request.getAll(`Api/Video/GetByTag`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
