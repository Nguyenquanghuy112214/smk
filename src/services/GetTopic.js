import * as request from '~/utils/request'

export const getTopic = async (q, r) => {
    try {
        const res = await request.getAll(`Api/Topic/GetByIDClassAndIDBook/${q}/${r}`, {
            params: {

            }
        })
        return res


    } catch (error) {
        console.log("error", error);
    }
}
