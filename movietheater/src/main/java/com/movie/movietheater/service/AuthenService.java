package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.RegisterRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.utils.ResultResp;

public interface AuthenService {
    AuthenResponse login(AuthenRequest request);

    CheckValidEmailResponse checkValidEmail(String email);

    boolean changePasswordByEmail(AuthenRequest authenRequest);

    ResultResp createUser(RegisterRequest registerRequest) throws Exception;

    UserResponse updateInfoUser(UserRequest userRequest);

}
