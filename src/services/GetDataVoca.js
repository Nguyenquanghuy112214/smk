import * as request from '~/utils/request';

export const GetDataVoca = async () => {
  try {
    const res = await request.getAllGame(`api/vocalbulary/GetDataVoca`);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
