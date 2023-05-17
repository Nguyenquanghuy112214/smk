import * as request from '~/utils/request'

export const getSpeak = async (q) => {
    try {
        const res = await request.getAll(`api/Speak/GetByIDVoCalbulary/${q}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
