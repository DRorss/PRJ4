package com.movie.movietheater.controller;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.service.UserService;
import com.movie.movietheater.utils.ObjectError;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    public UserService userService;

    @GetMapping
    public ResultResp<UserResponse> getInfoUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            return ResultResp.success(userService.getInfoUser(userDetails.getUsername()));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @PutMapping
    public ResultResp<UserResponse> updateInfoUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UserRequest userRequest) {
        try {
            userRequest.setUserName(userDetails.getUsername());
            return ResultResp.success(userService.updateInfoUser(userRequest));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/getDetail/{id}")
    public ResultResp<UserResponse> getInfoUserById(@PathVariable Integer id) {
        try {
            return ResultResp.success(userService.getInfoUserById(id));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/getUser")
    public ResultResp<UserResponse> getAllUser(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestParam String fullName,
                                               @RequestParam Integer page,
                                               @RequestParam Integer size) {
        try {
            return ResultResp.success(userService.getUserByFullName(fullName, page, size));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }
}