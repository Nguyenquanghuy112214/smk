import * as request from '~/utils/request';

export const createUserVoca = async (q, r) => {
  try {
    const res = await request.post(`api/Vocalbulary/UserVocabulary`, q, r, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
