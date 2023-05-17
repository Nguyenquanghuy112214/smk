import * as request from '~/utils/request'

export const getVocaSingle = async (q) => {
    try {
        const res = await request.getAll(`api/Vocalbulary/GetSingleByID/${q}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
