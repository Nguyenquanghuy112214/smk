import * as request from '~/utils/request';

export const getStoryBySeries = async (q) => {
  try {
    const res = await request.getAll(`Api/Story/GetBySeries/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
