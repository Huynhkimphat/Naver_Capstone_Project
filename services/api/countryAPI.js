import { axiosClient } from "./axiosClient";
const countryAPI = {
    async getAll() {
        const response = await axiosClient.get('all')
        return response.data
    },
}

export default countryAPI
