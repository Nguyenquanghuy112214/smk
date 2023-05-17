import * as request from '~/utils/request';

export const getGrammarByClassBook = async (q, r) => {
  try {
    const res = await request.getAll(`api/GrammarByTopic/GetBy/${q}/${r}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
