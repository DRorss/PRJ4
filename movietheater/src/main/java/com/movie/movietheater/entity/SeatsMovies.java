package com.movie.movietheater.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "seats_movies")
@NoArgsConstructor
@AllArgsConstructor
public class SeatsMovies {
    @Id
    private Long seats_id;

    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "price")
    private double price;

    @Column(name = "is_booked")
    private boolean isBooked;

    @Column(name = "user_id")
    private Long user_id;

    @ManyToOne
    @JoinColumn(name = "movie_id", insertable = false, updatable = false)
    @ToString.Exclude
    @JsonIgnore
    private Film film;

    @ManyToOne
    @JoinColumn(name = "seats_id", insertable = false, updatable = false)
    @ToString.Exclude
    @JsonIgnore
    private Seats seats;

    public SeatsMovies(Long seats_id, Long movie_id, double price, boolean isBooked, Long userId) {
        this.seats_id = seats_id;
        this.movieId = movie_id;
        this.price = price;
        this.isBooked = isBooked;
        this.user_id = userId;
    }
}