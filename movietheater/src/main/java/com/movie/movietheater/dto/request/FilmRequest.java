package com.movie.movietheater.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

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
}
