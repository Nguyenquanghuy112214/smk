import * as request from '~/utils/request';

export const getGrammarByTopic = async (q) => {
  try {
    const res = await request.getAll(`api/Grammar/GetGrammarByType/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
