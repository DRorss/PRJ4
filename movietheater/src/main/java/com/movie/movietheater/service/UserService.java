package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    UserResponse getInfoUser(String userName);

    UserResponse updateInfoUser(UserRequest userRequest);

    Page<User> getUserByFullName(String fullName, int page, int size);

    UserResponse getInfoUserById(Integer id);

    boolean updateEnabled(Long id);

}
