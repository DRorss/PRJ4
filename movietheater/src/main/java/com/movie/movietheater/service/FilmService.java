package com.movie.movietheater.service;

import com.movie.movietheater.dto.request.FilmRequest;
import com.movie.movietheater.dto.request.RegisterRequest;
import com.movie.movietheater.dto.response.FilmResponse;
import com.movie.movietheater.entity.Film;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FilmService {
    ResultResp save(FilmRequest filmRequest) throws Exception;

    Page<Film> get(String name, Integer page, Integer size) throws Exception;

    FilmResponse getDetail(Integer id) throws Exception;

    List<FilmResponse> getFilms() throws Exception;
}
