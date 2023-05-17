import * as requestGame from '~/utils/request';

export const GetVocaById = async (q) => {
  try {
    const res = await requestGame.getGame(`api/vocalbulary/GetVocaByIDTopic/${q}`);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
