import * as request from '~/utils/request';

export const upViewSong = async (q) => {
  try {
    const res = await request.getAll(`api/Song/UpdateNumberOfView/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
