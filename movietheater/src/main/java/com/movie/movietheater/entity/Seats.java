package com.movie.movietheater.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "seats")
public class Seats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int seatNumber;
    private String seatRow;
    private String type;

    @OneToMany(mappedBy = "seats",cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SeatsMovies> seatsMovies;

}