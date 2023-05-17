import * as request from '~/utils/request';

export const getPopularStory = async (q) => {
  try {
    const res = await request.getAll(`api/Story/NumberOfViews`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
