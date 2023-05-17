import * as request from '~/utils/request';

export const getGrammarLearned = async (q) => {
  try {
    const res = await request.getAll(`api/UserGrammar/GetAllGrammarLearn`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
