package com.movie.movietheater.dto.response;

import com.movie.movietheater.dto.request.BookingsRequest;
import com.movie.movietheater.dto.request.FilmRequest;
import com.movie.movietheater.entity.Bookings;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    public String userName;
    public String email;
    public String fullName;
    public String filmName;
    public String role;
    public String password;
    public boolean enabled;
    public List<BookingsRequest> bookingsRequests;

    public UserResponse(String userName, String email, String fullName,
                        String role, List<BookingsRequest> bookingsRequests) {
        this.userName = userName;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.bookingsRequests = bookingsRequests;
    }

    public UserResponse(String userName, String email, String fullName, String role, String password, boolean enabled, String a) {
        this.userName = userName;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.password = password;
        this.enabled = enabled;
    }

    public UserResponse(String userName, String email, String fullName, String role) {
        this.userName = userName;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }
}
