import * as request from '~/utils/request';

export const getAllProvince = async (q) => {
  try {
    const res = await request.getAll('api/province/getall', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
