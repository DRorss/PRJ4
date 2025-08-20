package com.movie.movietheater.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
    public String userName;
    public String fullName;
    public String password;
    public String email;
    public String role;
}
