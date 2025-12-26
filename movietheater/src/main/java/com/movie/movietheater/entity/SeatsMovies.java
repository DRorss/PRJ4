package com.movie.movietheater.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats_movies")
@Getter
@Setter
public class SeatsMovies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long seatsId;
    private Long bookingId;
    private double price;
    private boolean isBooked;
    private Long userId;
    private Long movieId;

    public SeatsMovies(Long seatsId, Long price,
                       boolean isBooked, Long bookingId,
                       Long userId, Long movieId) {
        this.seatsId = seatsId;
        this.price = price;
        this.isBooked = isBooked;
        this.bookingId = bookingId;
        this.userId = userId;
        this.movieId = movieId;
    }
    public SeatsMovies() {
    }
}