import * as request from '~/utils/request';

export const getByProvinceID = async (q) => {
  try {
    const res = await request.getAll(`api/District/GetByProvinceID/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
