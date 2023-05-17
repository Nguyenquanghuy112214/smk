import * as request from '~/utils/request'

export const getAllClass = async (q) => {
    try {
        const res = await request.getAll('api/Class/GetAll', q, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
