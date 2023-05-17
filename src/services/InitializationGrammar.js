import * as request from '~/utils/request';

export const Initialization = async (data, headers) => {
  try {
    const res = await request.post('api/UserGrammar/Create', data, headers, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
