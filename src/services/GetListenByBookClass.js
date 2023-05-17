import * as request from '~/utils/request';

export const getListenByBookClass = async (q, r, t) => {
  try {
    const res = await request.getAll(`api/Listen/GetListenByBookClass/${q}/${r}`, t, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
