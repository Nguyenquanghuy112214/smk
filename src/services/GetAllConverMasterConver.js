import * as request from '~/utils/request';

export const getAllConverMasterConver = async (q) => {
  try {
    const res = await request.getAll('api/UserConversation/GetAllConverMaster', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
