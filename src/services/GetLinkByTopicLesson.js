import * as request from '~/utils/request'

export const getLinkByTopicLesson = async (q, r) => {
    try {
        const res = await request.getAll(`api/VocabularyByTopicLesson/GetLinkByTopicLesson/${q}/${r}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
