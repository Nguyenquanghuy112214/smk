import * as request from '~/utils/request'

export const register = async (q) => {
    try {
        const res = await request.post(`api/ApplicationUser/Register`, q, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
