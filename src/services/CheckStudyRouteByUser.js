import * as request from '~/utils/request';

export const checkStudyRouteByUser = async (q) => {
  try {
    const res = await request.getAll('api/StudyRoute/CheckStudyRouteByUser', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
