import * as request from '~/utils/request';

export const getCourseware = async (q, r) => {
  try {
    const res = await request.getAll(`api/Document/GetByClassBook/${q}/${r}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
