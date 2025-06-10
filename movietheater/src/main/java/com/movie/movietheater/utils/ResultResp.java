package com.movie.movietheater.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.io.Serializable;

public class ResultResp<T> extends ResponseEntity {

    public ResultResp(HttpStatus status, Object body) {
        super(body, status);
    }

    public static ResultResp success(Object data) {
        BodyData<Object> bodyData = new BodyData(MsgCode.OK, data, HttpStatus.OK.getReasonPhrase());
        return new ResultResp(HttpStatus.OK, bodyData);
    }

    public static ResultResp error(Object data) {
        BodyData<Object> bodyData = new BodyData(MsgCode.ERROR, data, HttpStatus.OK.getReasonPhrase());
        return new ResultResp(HttpStatus.INTERNAL_SERVER_ERROR, bodyData);
    }

    public static ResultResp created() {
        BodyData<Object> bodyData = new BodyData(MsgCode.OK, null, HttpStatus.OK.getReasonPhrase());
        return new ResultResp(HttpStatus.CREATED, bodyData);
    }


    public static ResultResp success(ObjectError success, Object data) {
        BodyData<Object> bodyData = new BodyData(success.getCode(), data, success.getMessage());
        return new ResultResp(HttpStatus.OK, bodyData);
    }

    public static ResultResp badRequest(ObjectError objError) {
        BodyData<Object> bodyData = new BodyData(objError.getCode(), null, objError.getMessage() == null ? HttpStatus.BAD_REQUEST.getReasonPhrase() : objError.getMessage());
        return new ResultResp(HttpStatus.BAD_REQUEST, bodyData);
    }

    public static ResultResp badRequest(ObjectError objError, Object data) {
        BodyData<Object> bodyData = new BodyData(objError.getCode(), data, objError.getMessage() == null ? HttpStatus.BAD_REQUEST.getReasonPhrase() : objError.getMessage());
        return new ResultResp(HttpStatus.BAD_REQUEST, bodyData);
    }

    public static ResultResp unauthorized(ObjectError objError) {
        BodyData<Object> bodyData = new BodyData(objError.getCode(), null, objError.getMessage() == null ? HttpStatus.BAD_REQUEST.getReasonPhrase() : objError.getMessage());
        return new ResultResp(HttpStatus.UNAUTHORIZED, bodyData);
    }


    //    @XmlRootElement(name="error")
    private static class BodyData<T> implements Serializable {
        //        @XmlElement(name="code")
        @JsonProperty("code")
        private String code;

        //        @XmlElement(name="message")
        @JsonProperty("message")
        private String message;

        //        @XmlElement(name="data")
        @JsonProperty("data")
        private T data;

        BodyData() {
        }

        BodyData(T data, String message) {
            this.data = data;
            this.message = message;
        }

        BodyData(String code, T data, String message) {
            this.data = data;
            this.code = code;
            this.message = message;
        }
    }


    @Override
    public String toString() {
        return "";
    }

    public String toJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper().setAnnotationIntrospector(new JacksonAnnotationIntrospector());
        return mapper.writeValueAsString(this);
    }

    public static <T> T fromJson(String json, Class<T> clazz) throws IOException {
        ObjectMapper mapper = new ObjectMapper().setAnnotationIntrospector(new JacksonAnnotationIntrospector());
        return mapper.readValue(json, clazz);
    }

}