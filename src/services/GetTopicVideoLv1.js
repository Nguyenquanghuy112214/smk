import * as request from '~/utils/request';

export const getTopicVideoLv1 = async (q) => {
  try {
    const res = await request.getAll(`api/CategoryVideo/GetByLevel/1`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
