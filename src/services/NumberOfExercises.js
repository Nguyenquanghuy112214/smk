import * as request from '~/utils/request';

export const numberOfExercises = async (q) => {
  try {
    const res = await request.getAll(`api/UserExercise/GetPercentExerciseLearnByUser`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
