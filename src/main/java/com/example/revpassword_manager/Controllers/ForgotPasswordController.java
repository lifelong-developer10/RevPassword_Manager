package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.DTOs.ForgotPasswordRequest;
import com.example.revpassword_manager.DTOs.ResetPasswordRequest;
import com.example.revpassword_manager.DTOs.VerifySecurityAnswersRequest;
import com.example.revpassword_manager.Services.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forgot")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService service;

    // Step 1 — Get Questions
    @PostMapping("/questions")
    public List<String> getQuestions(
            @RequestBody ForgotPasswordRequest request) {

        return service.getQuestions(request.getUsername());
    }

    // Step 2 — Verify Answers
    @PostMapping("/verify")
    public String verify(
            @RequestBody VerifySecurityAnswersRequest request) {

        boolean result =
                service.verifyAnswers(request);

        return result ?
                "VERIFIED" :
                "INVALID_ANSWERS";
    }

    // Step 3 — Reset Password
    @PostMapping("/reset")
    public String reset(
            @RequestBody ResetPasswordRequest request) {

        return service.resetPassword(request);
    }
}
