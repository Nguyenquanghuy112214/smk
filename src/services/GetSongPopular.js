import * as request from '~/utils/request';

export const getSongPopular = async (q) => {
  try {
    const res = await request.getAll('Api/Song/GetSongByView', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
