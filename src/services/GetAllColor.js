import * as request from '~/utils/request';

export const getAllColor = async (q, r) => {
  try {
    const res = await request.getAll('api/Alphabet/GetColor', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
