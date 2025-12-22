package com.movie.movietheater.repository;

import com.movie.movietheater.entity.BookingSeats;
import com.movie.movietheater.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingSeatsRepository extends JpaRepository<BookingSeats, Long> {
}