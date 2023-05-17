import * as request from '~/utils/request';

export const numberOfMusic = async (q) => {
  try {
    const res = await request.getAll(`api/UserSong/GetPercentSongLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
