import * as request from '~/utils/request';

export const getByDistrictID = async (q) => {
  try {
    const res = await request.getAll(`api/Ward/GetByDistrictID/${q}`, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
