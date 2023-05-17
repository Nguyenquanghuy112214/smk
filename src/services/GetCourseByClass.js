import * as request from '~/utils/request';

export const getCourseByClass = async (q, r) => {
  try {
    const res = await request.getAll(`api/Course/GetCourseBy/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
