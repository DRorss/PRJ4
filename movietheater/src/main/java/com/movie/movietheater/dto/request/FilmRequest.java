package com.movie.movietheater.dto.request;

import com.movie.movietheater.entity.Film;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FilmRequest {
    private String id;
    private String name;
    private String author;
    private String type;
    private Integer volumnFilm;
    private String desc;
    private Boolean showHideFilm;
    private Date showTime;
    private Integer productionDate;
    private MultipartFile image;
    private BookingsRequest brlist;
    private String youtubeLink;

    public FilmRequest() {
    }

    public FilmRequest(Film film) {
        this.id = String.valueOf(film.getId());
        this.name = film.getName();
        this.author = film.getAuthor();
        this.type = film.getType();
        this.volumnFilm = film.getVolumnFilm();
        this.desc = film.getDescription();
        this.showHideFilm = film.getShowHideFilm();
        this.showTime = film.getShowTime();
        this.productionDate = film.getProductionTime();
        this.youtubeLink = film.getYoutubeLink();
    }
}
