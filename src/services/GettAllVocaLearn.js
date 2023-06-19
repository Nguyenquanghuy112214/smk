import * as request from '~/utils/request';

export const getVocaLearned = async (q) => {
  try {
    const res = await request.getAll(`api/UserVocabulary/GettAllVocaLearn`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
