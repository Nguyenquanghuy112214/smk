import * as request from '~/utils/request';

export const updateProfile = async (q, r) => {
  try {
    const res = await request.post(`api/ApplicationUser/UpdateProfile`, q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
