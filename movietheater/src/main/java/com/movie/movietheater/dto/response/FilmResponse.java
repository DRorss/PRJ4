package com.movie.movietheater.dto.response;

import com.movie.movietheater.entity.Film;
import io.jsonwebtoken.lang.Strings;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class FilmResponse {
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
    private String image;

    public FilmResponse(Film film) throws IOException {
        this.id = film.getId();
        if(Strings.hasText(film.getImagePath())) {
            Path path = Paths.get("uploads").resolve(film.getImagePath()).normalize();
            byte[] imageBytes = Files.readAllBytes(path);
            this.image = Base64.getEncoder().encodeToString(imageBytes);;
        }
        this.name = film.getName();
        this.author = film.getAuthor();
        this.showTime = film.getShowTime();
        this.type = film.getType();
        this.volumnFilm = film.getVolumnFilm();
        this.description = film.getDescription();
        this.showHideFilm = film.getShowHideFilm();
        this.productionTime = film.getProductionTime();
        this.imagePath = film.getImagePath();
        this.createdAt = film.getCreatedAt();
        this.updatedAt = film.getUpdatedAt();

    }
}
