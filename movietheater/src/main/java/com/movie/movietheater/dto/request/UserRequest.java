package com.movie.movietheater.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequest {
    public String id;
    public String userName;
    public String password;
    public String email;
    public String newPassword;
    public String fullName;
    public String role;
    public boolean enabled;
}
