import * as request from '~/utils/request';

export const getProcessGrammar = async (q) => {
  try {
    const res = await request.getAll(`api/UserGrammar/ProgressSchedule`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
