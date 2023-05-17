import * as request from '~/utils/request';

export const averagestudy = async (q) => {
  try {
    const res = await request.getAll('api/UserHistory/GetDataByWeek', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
