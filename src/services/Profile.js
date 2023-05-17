import * as request from '~/utils/request';

export const profile = async (q) => {
  try {
    const res = await request.getAll(`api/ApplicationUser/Profile`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
