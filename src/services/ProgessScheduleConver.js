import * as request from '~/utils/request';

export const progessScheduleConver = async (q) => {
  try {
    const res = await request.getAll(`api/UserConversation/ProgressSchedule`, q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
