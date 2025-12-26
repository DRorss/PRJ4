package com.movie.movietheater.controller;

import com.movie.movietheater.dto.request.AuthenRequest;
import com.movie.movietheater.dto.request.BookingsRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.service.BookingsService;
import com.movie.movietheater.service.Impl.BookingsServiceImpl;
import com.movie.movietheater.service.UserService;
import com.movie.movietheater.utils.ObjectError;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired
    public BookingsService bookingsService;

    @Autowired
    public UserService userService;

    @PostMapping()
    public ResultResp<BookingsRequest> bookings(@AuthenticationPrincipal UserDetails userDetails, @RequestBody BookingsRequest bookingsRequest) {
        try {
            bookingsRequest.setUserName(userDetails.getUsername());
            return ResultResp.success(bookingsService.booking(bookingsRequest));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping
    public ResultResp<UserResponse> bookings(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            return ResultResp.success(bookingsService.getInfoUser(userDetails.getUsername()));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/report-bookings")
    public ResultResp<UserResponse> reportBookings() {
        try {
            return ResultResp.success(bookingsService.reportBookings());
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }
}