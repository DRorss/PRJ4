package com.movie.movietheater.service.Impl;

import com.movie.movietheater.dto.request.FilmRequest;
import com.movie.movietheater.dto.response.FilmResponse;
import com.movie.movietheater.entity.Film;
import com.movie.movietheater.repository.FilmRepository;
import com.movie.movietheater.service.FilmService;
import com.movie.movietheater.utils.ResultResp;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class FilmServiceImpl implements FilmService {

    @Value("${upload.path:uploads/films}")
    private String uploadDir;

    @Autowired
    FilmRepository filmRepository;

    public ResultResp save(FilmRequest request) throws IOException {
        Film film = new Film();
        film.setCreatedAt(new Date());
        if(StringUtils.isNotEmpty(request.getId())){
            Optional<Film> filmOp = filmRepository.findById(Long.valueOf(request.getId()));
            film = filmOp.orElse(new Film());
            film.setUpdatedAt(new Date());
        }
        film.setName(request.getName());
        film.setAuthor(request.getAuthor());
        film.setShowTime(request.getShowTime());
        film.setType(request.getType());
        film.setVolumnFilm(request.getVolumnFilm());
        film.setDescription(request.getDesc());
        film.setShowHideFilm(request.getShowHideFilm());
        film.setProductionTime(request.getProductionDate());
        film.setEnabled(true);

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + request.getImage().getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            request.getImage().transferTo(uploadPath.resolve(fileName));
            film.setImagePath(uploadPath.toAbsolutePath() + "\\" + fileName);
        }

        return ResultResp.success(filmRepository.save(film));
    }

    @Override
    public Page<Film> get(String name, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return filmRepository.findByNameContainingIgnoreCaseOrderByNameAsc(name, pageable);
    }

    @Override
    public FilmResponse getDetail(Integer id) throws Exception{
        FilmResponse filmResponse = null;
        Optional<Film> filmOp  = filmRepository.findById(Long.valueOf(id));
        if(filmOp.isPresent()){
            filmResponse = new FilmResponse(filmOp.get());
        }
        return filmResponse;
    }

    @Override
    public List<FilmResponse> getFilms() throws Exception{
        List<FilmResponse> filmResponses = new ArrayList<>();
        List<Film> films = filmRepository.findAll();
        for(Film film : films){
            FilmResponse filmResponse = new FilmResponse(film);
            filmResponses.add(filmResponse);
        }
        return filmResponses;
    }

    @Override
    public boolean updateEnabled(Long id) throws Exception{
        try{
            Optional<Film> f = filmRepository.findById(id);
            if(f.isPresent()){
                Film film = f.get();
                film.setEnabled(!film.isEnabled());
                filmRepository.save(film);
            }
        }catch(Exception e){
            return false;
        }
        return true;
    }

}
