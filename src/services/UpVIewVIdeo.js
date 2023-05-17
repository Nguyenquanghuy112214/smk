import * as request from '~/utils/request';

export const upViewVideo = async (q) => {
  try {
    const res = await request.getAll(`api/Video/UpdateNumberOfView/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
