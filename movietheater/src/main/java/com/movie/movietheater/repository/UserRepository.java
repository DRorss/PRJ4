package com.movie.movietheater.repository;

import com.movie.movietheater.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Integer id);

    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String email);

    Page<User> findByFullNameContainingIgnoreCaseOrderByIdDesc(String fullName, Pageable pageable);
}