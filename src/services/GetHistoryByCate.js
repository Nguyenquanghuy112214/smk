import * as request from '~/utils/request';

export const getHistoryByCate = async (q) => {
  try {
    const res = await request.getAll(`Api/Story/GetByIdCategory/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
