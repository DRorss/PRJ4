package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;

public interface AuthenService {
    AuthenResponse login(AuthenRequest request);

    CheckValidEmailResponse checkValidEmail(String email);

    boolean changePasswordByEmail(AuthenRequest authenRequest);
}
