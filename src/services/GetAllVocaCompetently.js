import * as request from '~/utils/request';

export const getAllVocaCompetently = async (q) => {
  try {
    const res = await request.getAll(`api/UserVocabulary/GetAllVocaCompetently`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
