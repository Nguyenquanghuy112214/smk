import * as request from '~/utils/request';

export const getAllTopicSong = async (q) => {
  try {
    const res = await request.getAll('Api/CategorySong/GetAll', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
