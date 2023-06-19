import * as request from '~/utils/request';

export const progressSchedule = async (q) => {
  try {
    const res = await request.getAll(`api/UserVocabulary/ProgressSchedule`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
