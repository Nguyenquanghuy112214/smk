import * as request from '~/utils/request';

export const getAllTopicHistory = async (q) => {
  try {
    const res = await request.getAll('Api/CategoryStory/GetAll', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
