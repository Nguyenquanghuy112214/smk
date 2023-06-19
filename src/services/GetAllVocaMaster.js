import * as request from '~/utils/request';

export const getAllVocaMaster = async (q) => {
  try {
    const res = await request.getAll(`api/UserVocabulary/GetAllVocaMaster`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
