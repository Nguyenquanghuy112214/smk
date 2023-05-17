import * as request from '~/utils/request';

export const learningSituation = async (data, headers) => {
  try {
    const res = await request.getAll('api/UserCourse/GetCourseByUser', data, headers, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
