import * as request from '~/utils/request';

export const numberOfStory = async (q) => {
  try {
    const res = await request.getAll(`api/UserStory/GetPercentStoryLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
