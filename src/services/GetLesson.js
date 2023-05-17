import * as request from '~/utils/request'

export const getLesson = async (q) => {
    try {
        const res = await request.getAll(`api/Lesson/GetByIdTopic/${q}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
