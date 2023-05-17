import * as request from '~/utils/request';

export const getVideoByTopic = async (q) => {
  try {
    const res = await request.getAll(`api/Video/GetByCategory/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
