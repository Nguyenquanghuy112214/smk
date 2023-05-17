import * as request from '~/utils/request';

export const GetGrammarMaster = async (q) => {
  try {
    const res = await request.getAll(`api/UserGrammar/GetAllGrammarMaster`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
