import * as request from '~/utils/request';

export const getTopicGrammar = async (q) => {
  try {
    const res = await request.getAll(`api/Grammar/GetInfoGrammarByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
