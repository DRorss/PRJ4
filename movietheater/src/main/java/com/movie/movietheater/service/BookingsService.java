package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.BookingsRequest;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.Bookings;

public interface BookingsService {
    Bookings booking(BookingsRequest bookingsRequest);
    UserResponse getInfoUser(String userName);


}
