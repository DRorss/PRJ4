package com.movie.movietheater.service.custom;

import com.movie.movietheater.entity.User;
import com.movie.movietheater.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        try {
            Optional<User> user = userRepository.findByUserName(username);
            if (user.isPresent()) {
                return new org.springframework.security.core.userdetails.User(
                        user.get().getUserName(),
                        user.get().getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority(user.get().getRole()))
                );
            } else {
                return null;
            }
        }catch (Exception ex){
            System.out.println("ex: " + ex.getMessage());
            return null;
        }
    }
}