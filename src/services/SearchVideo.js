import * as request from '~/utils/request';

export const searchVideo = async (q) => {
  try {
    const res = await request.getAll(`Api/Video/SeachByName/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
