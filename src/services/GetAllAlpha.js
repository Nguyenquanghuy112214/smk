import * as request from '~/utils/request';

export const getAllAlpha = async (q, r) => {
  try {
    const res = await request.getAll('api/Alphabet/GetAlphabet', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
