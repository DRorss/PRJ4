import * as actType from "../constants/movieList";
import { GROUP_ID } from "@/constants";
import { movieApi } from "@/api";

export const actGetMovie = (name = "", page, size) => {
  return (dispatch) => {
    dispatch(actGetMovieListRequest());

    const fetchMovieList = async () => {
      try {
        const movieList = await movieApi.getBannerList();
        dispatch(actGetMovieListSuccess(movieList?.data?.data));
      } catch (error) {
        dispatch(actGetMovieListFail(error));
      }
    };

    fetchMovieList();
  };
};

const actGetMovieList = async (name = "", page, size) => {
  return await movieApi.getMovieList(name, page, size);
}

const actGetMovieListRequest = () => {
  return {
    type: actType.GET_MOVIE_LIST_REQUEST,
  };
};

const actGetMovieListSuccess = (data) => {
  return {
    type: actType.GET_MOVIE_LIST_SUCCESS,
    payload: data,
  };
};

const actGetMovieListFail = (error) => {
  return {
    type: actType.GET_MOVIE_LIST_FAIL,
    payload: error,
  };
};

export default actGetMovieList;
