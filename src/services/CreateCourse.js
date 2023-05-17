import * as request from '~/utils/request';

export const createCourse = async (q, r) => {
  try {
    const res = await request.post('api/UserCourse/CreateUserCourse', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
