package com.movie.movietheater.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    public String userName;
    public String email;
    public String fullName;
    public String role;
}
