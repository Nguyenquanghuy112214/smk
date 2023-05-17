import * as request from '~/utils/request';

export const getAllCourse = async (q) => {
  try {
    const res = await request.getAll('api/Course/GetAll', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
