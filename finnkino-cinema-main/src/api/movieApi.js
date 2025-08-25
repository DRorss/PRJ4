import axiosClient from "./config/axiosClient";

const resourceName = "api/film";

const movieApi = {
  getBannerList: () => {
    const url = resourceName + "/getBanner";
    return axiosClient.get(url);
  },
  getMovieList: async (name, page, size) => {
    return await axiosClient.get(resourceName, { params: { name, page, size } });
  },
  getMovieDetails: (params) => {
    const url = resourceName + `/getDetail/${params}`;
    return axiosClient.get(url);
  },
  save: async (data) => {
    return await axiosClient.post(resourceName, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  editMovie: (formData) => {
    const url = resourceName + "CapNhatPhimUpload";
    return axiosClient.post(url, formData);
  },
  updateEnabled: (id) => {
    const url = resourceName + `/updateEnabled/${id}`;
    return axiosClient.put(url);
  },
};

export default movieApi;