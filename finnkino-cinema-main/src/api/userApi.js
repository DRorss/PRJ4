import axiosClient from "./config/axiosClient";

const resourceAuth = "api/auth/";

const resourceUser = "api/user/";

const userApi = {
  login: async (user) => {
    const url = resourceAuth + "login";
    return await axiosClient.post(url, user);
  },
  changePasswordByEmail: async (data) => {
    const url = resourceAuth + "changePasswordByEmail";
    return await axiosClient.post(url, data);
  },
  checkValidEmail: async (email) => {
    const url = resourceAuth + `checkValidEmail/${email}`;
    return await axiosClient.get(url);
  },
  register: async (user) => {
    const url = resourceAuth + "createUser";
    return await axiosClient.post(url, user);
  },
  update: async (user) => {
    const url = resourceAuth + "updateUser";
    return await axiosClient.post(url, user);
  },
  getUserList: async (fullName, page, size) => {
    const url = resourceUser + `getUser`;
    return await axiosClient.get(url, { params: { fullName, page, size } });
  },
  getUser: async () => {
    const url = resourceUser;
    return await axiosClient.get(url);
  },
  getUserDetails: (id) => {
    const url = resourceUser + `getDetail/${id}`;
    return axiosClient.get(url);
  },
  updateEnabled: (id) => {
    const url = resourceUser + `updateEnabled/${id}`;
    return axiosClient.put(url);
  },

};

export default userApi;
