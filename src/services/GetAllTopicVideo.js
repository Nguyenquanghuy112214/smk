import * as request from '~/utils/request';

export const getGetTopicVideo = async (q) => {
  try {
    const res = await request.getAll('api/CategoryVideo/GetAll', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
