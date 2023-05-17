import * as request from '~/utils/request'

export const getVocaByLesson = async (q, r) => {
    try {
        const res = await request.getAll(`api/Vocalbulary/GetVocaByLesson/${q}/${r}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
