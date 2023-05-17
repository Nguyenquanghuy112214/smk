import * as request from '~/utils/request';

export const numberOfLessons = async (q) => {
  try {
    const res = await request.getAll(`api/UserLesson/GetPercentLessonLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
