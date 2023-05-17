import * as request from '~/utils/request';

export const createContentHistory = async (q, r) => {
  try {
    const res = await request.postGame('api/UserHistory/CreateContentHistory', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
