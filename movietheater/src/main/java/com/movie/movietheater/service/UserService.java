package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;

public interface UserService {
    UserResponse getInfoUser(String userName);

    UserResponse updateInfoUser(UserRequest userRequest);
}
