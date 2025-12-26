package com.movie.movietheater.dto.response;

import com.movie.movietheater.entity.Film;
import com.movie.movietheater.entity.SeatsMovies;
import io.jsonwebtoken.lang.Strings;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class SeatFilmResponse {
    private Long seatsId;

    private Long movieId;
    private boolean isBooked;
    private Long userId;
    private Double price;
    private String type;

    public SeatFilmResponse(SeatsMovies sm) throws IOException {
        this.seatsId = sm.getSeatsId();
        this.movieId = sm.getMovieId();
        this.isBooked = sm.isBooked();
        this.userId = sm.getUserId();
        this.price = sm.getPrice();
//        this.type = sm.getSeats().getType();
    }
}
