import * as request from '~/utils/request';

export const createStudyRouteByUser = async (q) => {
  try {
    const res = await request.getAll('api/StudyRoute/CreateStudyRouteByUser', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
