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
    public String password;
    public boolean enabled;

    public UserResponse(String userName, String email, String fullName, String role) {
        this.userName = userName;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }


}
