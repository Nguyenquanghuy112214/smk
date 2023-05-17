import * as request from '~/utils/request';

export const getAllConverLearnConver = async (q) => {
  try {
    const res = await request.getAll('api/UserConversation/GetAllConverLearn', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
