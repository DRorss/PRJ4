import axiosInstance from '../utils/axiosInstance';

export const loginApi = async (data) => {
    try {
        return await axiosInstance.post('/api/auth/login', data);
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export const getValidEmail = async (email) => {
    try {
        return await axiosInstance.get(`/api/auth/checkValidEmail/${email}`);
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export const changePasswordByEmail = async (data) => {
    try {
        return await axiosInstance.post("/api/auth/changePasswordByEmail", data);
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export const logout = async () => {
    try {
        return await axiosInstance.post("/api/auth/logout");
    } catch (ex) {
        console.log(ex);
        return null;
    }
}