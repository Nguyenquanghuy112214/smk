import * as requestGame from '~/utils/request';

export const GetAllTopic = async () => {
  try {
    const res = await requestGame.getAllGame(`api/topic/GetAllTopic`);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
