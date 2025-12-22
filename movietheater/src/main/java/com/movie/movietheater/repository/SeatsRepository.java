package com.movie.movietheater.repository;

import com.movie.movietheater.entity.Film;
import com.movie.movietheater.entity.Seats;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatsRepository extends JpaRepository<Seats, Long> {
    List<Seats> findAll();

}