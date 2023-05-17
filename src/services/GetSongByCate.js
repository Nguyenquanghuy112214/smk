import * as request from '~/utils/request';

export const getSongByCate = async (q) => {
  try {
    const res = await request.getAll(`Api/CategorySong/GetSongByCategoryID/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
