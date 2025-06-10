import axiosInstance from '../utils/axiosInstance';

const BASE_URL_API = "/api/user";

export const getInfoUser = async () => {
    try {
        return await axiosInstance.get(BASE_URL_API);
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export const updateInfoUser = async (data) => {
    try {
        return await axiosInstance.put(BASE_URL_API, data);
    } catch (ex) {
        console.log(ex);
        return null;
    }
}