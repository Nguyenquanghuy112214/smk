import * as request from '~/utils/request';

export const searchStory = async (q) => {
  try {
    const res = await request.getAll(`Api/Story/SeachByName/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
