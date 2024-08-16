package com.olsenjames1116.spotme.model;

public class Response {
    private String message;
    private int status;

    public Response() {}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
