package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.BookingsRequest;
import com.movie.movietheater.dto.response.ReportBookingsResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.Bookings;

import java.util.List;

public interface BookingsService {
    Bookings booking(BookingsRequest bookingsRequest);
    UserResponse getInfoUser(String userName);

    List<ReportBookingsResponse> reportBookings();

}
