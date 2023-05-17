import * as request from '~/utils/request';

export const getStudyRoute = async (q) => {
  try {
    const res = await request.getAll(`api/StudyRoute/GetStudyRouteByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
