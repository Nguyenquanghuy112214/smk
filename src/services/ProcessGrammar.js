import * as request from '~/utils/request';

export const processGrammar = async (q) => {
  try {
    const res = await request.getAll(`api/UserGrammar/GetPercentGrammarLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
