package com.movie.movietheater.repository;

import com.movie.movietheater.entity.Seats;
import com.movie.movietheater.entity.SeatsMovies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatsMoviesRepository extends JpaRepository<SeatsMovies, Long> {
    List<SeatsMovies> findAll();

    List<SeatsMovies> findByMovieId(@Param("movieId") Long movie_id);

    List<SeatsMovies> findByMovieIdAndBookingId(@Param("movieId") Long movie_id, @Param("bookingId") Long bookingId);

    SeatsMovies findBySeatsId(@Param("seatsId") Long seats_id);


    SeatsMovies findBySeatsIdAndMovieId(@Param("seatsId") Long seats_id, @Param("movieId") Long movie_id);

}