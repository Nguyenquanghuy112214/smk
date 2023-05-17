import * as request from '~/utils/request';

export const getConversationByBookClass = async (q, r, t) => {
  try {
    const res = await request.getAll(`api/ConversationCategori/GetConversationByBookClass/${q}/${r}`, t, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
