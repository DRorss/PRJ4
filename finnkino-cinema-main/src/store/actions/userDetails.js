import * as actType from "../constants/userDetails";
import { GROUP_ID } from "@/constants";
import { userApi } from "@/api";

const actUserDetailsRequest = () => {
  return {
    type: actType.GET_USER_DETAILS_REQUEST,
  };
};

export const actUserDetailsSuccess = (data) => {
  return {
    type: actType.GET_USER_DETAILS_SUCCESS,
    payload: data,
  };
};

const actUserDetailsFail = (error) => {
  return {
    type: actType.GET_USER_DETAILS_FAIL,
    payload: error,
  };
};

const actGetUserDetails = (id = "") => {
  return (dispatch) => {
    dispatch(actUserDetailsRequest());

    const fetchUserDetails = async () => {
      try {
        const userDetails = await userApi.getUserDetails(id);
        dispatch(actUserDetailsSuccess(userDetails));
      } catch (error) {
        dispatch(actUserDetailsFail(error));
      }
    };

    fetchUserDetails();
  };
};

export default actGetUserDetails;
