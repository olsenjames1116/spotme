package com.olsenjames1116.spotme.model;

public class AuthenticationResponse extends Response {
    private final String accessToken;

    public AuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
