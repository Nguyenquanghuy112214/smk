import * as request from '~/utils/request';

export const logout = async (q) => {
  try {
    const res = await request.post(`api/ApplicationUser/Logout`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
