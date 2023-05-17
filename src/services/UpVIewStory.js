import * as request from '~/utils/request';

export const upViewStory = async (q) => {
  try {
    const res = await request.getAll(`api/Story/UpdateNumberOfView/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
