import * as request from '~/utils/request';

export const searchSong = async (q) => {
  try {
    const res = await request.getAll(`Api/Song/SeachByName/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
