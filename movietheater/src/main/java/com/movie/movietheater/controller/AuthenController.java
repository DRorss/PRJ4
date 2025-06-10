package com.movie.movietheater.controller;

import com.movie.movietheater.config.WebSecurityConfig;
import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.service.AuthenService;
import com.movie.movietheater.utils.JwtUtils;
import com.movie.movietheater.utils.ObjectError;
import com.movie.movietheater.utils.ResultResp;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenController {

    @Autowired
    private JwtUtils jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthenService authenService;

    @Autowired
    private WebSecurityConfig webSecurityConfig;

    @PostMapping("/login")
    public ResultResp<AuthenResponse> login(@RequestBody AuthenRequest request) {
        try {
            return ResultResp.success(authenService.login(request));
        }catch (Exception ex){
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/checkValidEmail/{email}")
    public ResultResp<CheckValidEmailResponse> checkValidEmail(@PathVariable String email) {
        try {
            return ResultResp.success(authenService.checkValidEmail(email));
        }catch (Exception ex){
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @PostMapping("/changePasswordByEmail")
    public ResultResp<AuthenResponse> changePasswordByEmail(@RequestBody AuthenRequest authenRequest) {
        try {
            authenRequest.setNewPassword(webSecurityConfig.passwordEncoder().encode(authenRequest.getNewPassword()));
            return ResultResp.success(authenService.changePasswordByEmail(authenRequest));
        }catch (Exception ex){
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResultResp<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        return ResultResp.success("ok");
    }
}