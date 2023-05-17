import * as request from '~/utils/request';

export const createUserGrammar = async (q, r) => {
  try {
    const res = await request.post('api/UserGrammar/Create', q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
