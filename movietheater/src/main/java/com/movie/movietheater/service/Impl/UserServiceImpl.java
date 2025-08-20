package com.movie.movietheater.service.Impl;

import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.User;
import com.movie.movietheater.repository.UserRepository;
import com.movie.movietheater.service.UserService;
import com.movie.movietheater.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    public UserResponse getInfoUser(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            return new UserResponse(user.get().getUserName(),
                    user.get().getEmail(),
                    user.get().getFullName(),
                    user.get().getRole(),
                    user.get().getPassword(),
                    user.get().isEnabled()
            );
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }

    public UserResponse updateInfoUser(UserRequest userRequest) {
        String userName = jwtUtils.getCurrentUsername();
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            User uEntity = user.get();
            uEntity.setFullName(userRequest.getFullName());
            uEntity.setPassword(jwtUtils.passwordEncoder().encode(userRequest.getNewPassword()));
            userRepository.save(uEntity);

            return new UserResponse(uEntity.getUserName(), uEntity.getEmail(), uEntity.getFullName(), uEntity.getRole());
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }

    @Override
    public Page<User> getUserByFullName(String fullName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByFullNameContainingIgnoreCaseOrderByIdDesc(fullName, pageable);
    }

    @Override
    public UserResponse getInfoUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return new UserResponse(user.get().getUserName(),
                    user.get().getEmail(),
                    user.get().getFullName(),
                    user.get().getRole(),
                    user.get().getPassword(),
                    user.get().isEnabled()
            );
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }

}
