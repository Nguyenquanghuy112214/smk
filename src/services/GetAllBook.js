import * as request from '~/utils/request'

export const getAllBook = async (q) => {
    try {
        const res = await request.getAll('api/Book/GetAll', q, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
