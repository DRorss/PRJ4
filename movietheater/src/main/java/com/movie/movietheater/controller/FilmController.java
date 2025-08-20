package com.movie.movietheater.controller;

import com.movie.movietheater.dto.request.FilmRequest;
import com.movie.movietheater.dto.request.UserRequest;
import com.movie.movietheater.dto.response.FilmResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.service.FilmService;
import com.movie.movietheater.service.UserService;
import com.movie.movietheater.utils.ObjectError;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/film")
public class FilmController {

    @Autowired
    public UserService userService;

    @Autowired
    public FilmService filmService;

    @GetMapping
    public ResultResp<?> get(@RequestParam String name,
                                             @RequestParam Integer page,
                                             @RequestParam Integer size) {
        try {
            return ResultResp.success(filmService.get(name, page, size));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/getDetail/{id}")
    public ResultResp<?> getDetail(@PathVariable Integer id) {
        try {
            return ResultResp.success(filmService.getDetail(id));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResultResp<?> save( @ModelAttribute FilmRequest request) {
        try {
            return ResultResp.success(filmService.save(request));
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

    @GetMapping("/getBanner")
    public ResultResp<?> getBanner() {
        try {
            return ResultResp.success(filmService.getFilms());
        } catch (Exception ex) {
            return ResultResp.error(new ObjectError("Error", ex.getMessage()));
        }
    }

}