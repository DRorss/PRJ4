package com.movie.movietheater.repository;

import com.movie.movietheater.entity.Film;
import com.movie.movietheater.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {
    Page<Film> findByNameContainingIgnoreCaseOrderByNameAsc(String name, Pageable pageable);
}