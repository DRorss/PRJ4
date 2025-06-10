package com.movie.movietheater.utils;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CustomExceptionHandler extends RuntimeException {

    private String msgCode;
    private HttpStatus httpStatus;
    private Object data;

    public CustomExceptionHandler(String msgCode, HttpStatus httpStatus) {
        super(msgCode);

        this.msgCode = msgCode;
        this.httpStatus = httpStatus;
    }

    public CustomExceptionHandler(String msgCode, HttpStatus httpStatus, Object data) {
        super(msgCode);

        this.msgCode = msgCode;
        this.httpStatus = httpStatus;
        this.data = data;
    }
    public CustomExceptionHandler(HttpStatus httpStatus, Object data) {
        this.httpStatus = httpStatus;
        this.data = data;
    }

}