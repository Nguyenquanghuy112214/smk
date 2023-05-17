import * as request from '~/utils/request';

export const getByIdConverCategory = async (q) => {
  try {
    const res = await request.getAll(`api/ConversationContent/GetByIdConverCategory/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
