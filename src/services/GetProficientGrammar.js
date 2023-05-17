import * as request from '~/utils/request';

export const getProficientGrammar = async (q) => {
  try {
    const res = await request.getAll(`api/UserGrammar/GetAllGrammerCompetently`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
