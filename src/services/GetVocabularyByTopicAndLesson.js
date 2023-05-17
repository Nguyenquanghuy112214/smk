import * as request from '~/utils/request'

export const getVocabularyTopicAndLesson = async (q, r) => {
    try {
        const res = await request.getAll(`api/Vocalbulary/GetByIDTopicAndIDLesson/${q}/${r}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
