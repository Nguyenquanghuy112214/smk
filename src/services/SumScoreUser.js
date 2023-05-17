import * as request from '~/utils/request';

export const sumScoreUser = async (q) => {
  try {
    const res = await request.getAll(`api/UserScore/SumScoreUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
