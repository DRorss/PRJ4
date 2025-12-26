package com.movie.movietheater.repository;

import com.movie.movietheater.dto.response.ReportBookingsResponse;
import com.movie.movietheater.entity.Bookings;
import com.movie.movietheater.entity.Film;
import com.movie.movietheater.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    List<Bookings> findAllByUserId(long userId);

    @Query(value = """          
                SELECT
                            f.name AS movieName,
                            SUM(sm.price) AS price
                        FROM movie_theater.films f
                        JOIN movie_theater.seats_movies sm ON f.id = sm.movie_id
                        where is_booked = true and booking_id is not null
                        GROUP BY f.name
                        ORDER BY price DESC
            """,
            nativeQuery = true)
    List<ReportBookingsResponse> sumPricesByMovie();
}