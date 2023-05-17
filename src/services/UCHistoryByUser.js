import * as request from '~/utils/request';

export const uCHistoryByUser = async (q, r) => {
  try {
    const res = await request.post(`api/UserHistory/UCHistoryByUser`, q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
