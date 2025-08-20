package com.movie.movietheater.service.Impl;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.RegisterRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.User;
import com.movie.movietheater.repository.UserRepository;
import com.movie.movietheater.service.AuthenService;
import com.movie.movietheater.utils.CustomExceptionHandler;
import com.movie.movietheater.utils.JwtUtils;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class AuthenServiceImpl implements AuthenService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    public AuthenResponse login(AuthenRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails.getUsername());
            return getInfoUser(loginRequest, token);
        } catch (Exception ex) {
            throw new RuntimeException();
        }
    }

    public AuthenResponse getInfoUser(AuthenRequest request, String token) {
        Optional<User> user = userRepository.findByUserName(request.getUserName());
        if (user.isPresent()) {
            return new AuthenResponse(user.get().getUserName(),
                    user.get().getEmail(),
                    user.get().getFullName(),
                    token,
                    user.get().getRole());
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }

    public CheckValidEmailResponse checkValidEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return new CheckValidEmailResponse(user.get().getEmail());
        } else {
            throw new CustomExceptionHandler(HttpStatus.NOT_FOUND.getReasonPhrase(), HttpStatus.BAD_REQUEST, "Không tìm thấy email");
        }
    }

    public boolean changePasswordByEmail(AuthenRequest authenRequest) {
        Optional<User> userOp = userRepository.findByEmail(authenRequest.getEmail());
        if (userOp.isPresent()) {
            User user = userOp.get();
            user.setPassword(authenRequest.getNewPassword());
            userRepository.save(user);
            return true;
        } else {
            throw new CustomExceptionHandler(HttpStatus.NOT_FOUND.getReasonPhrase(), HttpStatus.BAD_REQUEST, "Không tìm thấy email");
        }
    }

    public ResultResp createUser(RegisterRequest registerRequest) {
        Optional<User> existUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existUser.isPresent()) {
            return ResultResp.error("Đã tồn tại email trong hệ thống!");
        }
        existUser = userRepository.findByUserName(registerRequest.getUserName());
        if (existUser.isPresent()) {
            return ResultResp.error("Đã tồn tại tên đăng nhập trong hệ thống!");
        }

        User user = new User();
        user.setUserName(registerRequest.getUserName());
        user.setFullName(registerRequest.getFullName());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        user.setEnabled(true);
        user.setRole(registerRequest.getRole());

        userRepository.save(user);
        return ResultResp.success(user);
    }

    public UserResponse updateInfoUser(UserRequest userRequest) {
        Optional<User> user = userRepository.findByUserName(userRequest.getUserName());
        if (user.isPresent()) {
            User uEntity = user.get();
            uEntity.setFullName(userRequest.getFullName());
            if(StringUtils.hasText(userRequest.getPassword())) {
                uEntity.setPassword(jwtUtils.passwordEncoder().encode(userRequest.getPassword()));
            }
            uEntity.setEmail(userRequest.getEmail());
            uEntity.setRole(userRequest.getRole());
            uEntity.setEnabled(userRequest.isEnabled());
            userRepository.save(uEntity);

            return new UserResponse(uEntity.getUserName(), uEntity.getEmail(), uEntity.getFullName(), uEntity.getRole());
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }
}
