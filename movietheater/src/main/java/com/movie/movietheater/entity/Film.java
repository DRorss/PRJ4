package com.movie.movietheater.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "films")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String author;
    private Date showTime;
    private String type;
    private Integer volumnFilm;
    private String description;
    private Boolean showHideFilm;
    private Integer productionTime;
    private String imagePath; // save image filename or path
    private Date createdAt;
    private Date updatedAt;

}