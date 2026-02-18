package com.example.revpassword_manager.DTOs;

import lombok.Data;

import java.util.Map;

@Data
public class VerifySecurityAnswersRequest {

    private String username;

    // question -> answer
    private Map<String, String> answers;

}