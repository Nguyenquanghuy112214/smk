import * as request from '~/utils/request';

export const createUserConversation = async (q, r) => {
  try {
    const res = await request.post('api/UserConversation/Create', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
