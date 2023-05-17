import * as request from '~/utils/request';

export const processPractiveListen = async (q) => {
  try {
    const res = await request.getAll(`api/UserListen/GetPercentListenLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
