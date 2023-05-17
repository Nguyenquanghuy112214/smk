import * as request from '~/utils/request';

export const updateLearningData = async (data, headers, params) => {
  try {
    const res = await request.postGame(`api/UserCourse/CreateTopicLessonUserCourse?courseID=${params}`, data, headers);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
