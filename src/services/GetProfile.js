import * as request from '~/utils/request'

export const getProfile = async (q) => {
    try {
        const res = await request.getAll('Api/ApplicationUser/Profile', q, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
