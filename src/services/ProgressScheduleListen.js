import * as request from '~/utils/request';

export const progressScheduleListen = async (q) => {
  try {
    const res = await request.getAll(`api/UserListen/ProgressSchedule`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
