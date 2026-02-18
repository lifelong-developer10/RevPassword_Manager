package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.DTOs.ForgotPasswordRequest;
import com.example.revpassword_manager.DTOs.ResetPasswordRequest;
import com.example.revpassword_manager.DTOs.VerifySecurityAnswersRequest;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionMasterRepository;
import com.example.revpassword_manager.Services.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forgot")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService service;
    private final SecurityQuestionMasterRepository masterRepo;

    // ✅ Get all master questions (for registration page)
    @GetMapping("/security-questions")
    public List<SecurityQuestionMaster> getAllQuestions() {
        return masterRepo.findAll();
    }

    // ✅ Step 2 — Verify Answers
    @PostMapping("/verify")
    public String verify(
            @RequestBody VerifySecurityAnswersRequest request) {

        boolean result =
                service.verifyAnswers(request);

        return result ?
                "VERIFIED" :
                "INVALID_ANSWERS";
    }

    // ✅ Step 3 — Reset Password
    @PostMapping("/reset")
    public String reset(
            @RequestBody ResetPasswordRequest request) {

        return service.resetPassword(request);
    }
}