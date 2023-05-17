import * as request from '~/utils/request'

export const getAllVoca = async (q) => {
    try {
        const res = await request.getAll('api/Vocalbulary/GetAll', q, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
