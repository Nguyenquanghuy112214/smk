import * as request from '~/utils/request';

export const getAllProcess = async (q) => {
  try {
    const res = await request.getAll('Api/StudyRoute/GetAll', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
