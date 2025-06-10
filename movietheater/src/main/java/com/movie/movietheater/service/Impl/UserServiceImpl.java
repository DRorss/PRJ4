package com.movie.movietheater.service.Impl;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.User;
import com.movie.movietheater.repository.UserRepository;
import com.movie.movietheater.service.AuthenService;
import com.movie.movietheater.service.UserService;
import com.movie.movietheater.utils.CustomExceptionHandler;
import com.movie.movietheater.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    public UserResponse getInfoUser(String userName){
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            return new UserResponse(user.get().getUserName(),
                    user.get().getEmail(),
                    user.get().getFullName(),
                    user.get().getRole());
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }

    public UserResponse updateInfoUser(UserRequest userRequest){
        String userName = jwtUtils.getCurrentUsername();
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            User uEntity = user.get();
            uEntity.setFullName(userRequest.getFullName());
            uEntity.setPassword(jwtUtils.passwordEncoder().encode(userRequest.getNewPassword()));
            userRepository.save(uEntity);

            return new UserResponse(uEntity.getUserName(), uEntity.getEmail(), uEntity.getFullName(), uEntity.getRole());
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }



}
