import * as request from '~/utils/request';

export const processConversation = async (q) => {
  try {
    const res = await request.getAll(`api/UserConversation/GetPercentConversationLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
