import * as request from '~/utils/request';

export const getSongByIdTopic = async (q) => {
  try {
    const res = await request.getAll(`Api/Song/GetByIdTopic/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
