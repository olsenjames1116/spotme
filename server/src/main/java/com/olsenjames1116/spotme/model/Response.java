package com.olsenjames1116.spotme.model;

import org.springframework.http.HttpStatus;

public class Response {
    private String message;
    private HttpStatus status;

    public Response() {}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
