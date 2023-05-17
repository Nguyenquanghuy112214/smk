import * as request from '~/utils/request';

export const getTopicVideoLv0 = async (q) => {
  try {
    const res = await request.getAll('api/CategoryVideo/GetByLevel/0', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
