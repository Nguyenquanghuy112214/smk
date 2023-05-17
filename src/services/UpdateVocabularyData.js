import * as request from '~/utils/request';

export const updateVocabularyData = async (data, headers, params, params2) => {
  try {
    const res = await request.postGame(`api/UserCourse/CreateVocaExerciseUserCourse?courseID=${params}&study=${params2}`, data, headers);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
