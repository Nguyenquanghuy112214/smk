import * as request from '~/utils/request';

export const conversationalSkillsConver = async (q) => {
  try {
    const res = await request.getAll('api/UserConversation/ConversationalSkills', q, {
      params: {},
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
