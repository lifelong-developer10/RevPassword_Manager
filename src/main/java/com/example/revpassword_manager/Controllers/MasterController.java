package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.*;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Security.CustomUserDetails;
import com.example.revpassword_manager.Services.AuthService;
import com.example.revpassword_manager.Services.ForgotPasswordService;
import com.example.revpassword_manager.Services.SecurityQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MasterController {

        private final AuthService service;
private final SecurityQuestionRepository masterRepo;
private final UserRepository userRepo;
private final AuthService authService;
private final SecurityQuestionService security;
private final ForgotPasswordService forgotPasswordService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        String message = service.register(req);

        return ResponseEntity.ok().body(
                Map.of("message", message)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest req) {

        String token = service.login(req);

        return ResponseEntity.ok(
                new AuthResponse(token, "Login Successful")
        );
    }

    @GetMapping
    public ProfileResponse getProfile(Authentication auth) {

        String username = auth.getName();

        MasterUser user =
                userRepo.findByUsername(username)
                        .orElseThrow();
        System.out.println("PROFILE USER: " + username);
        return new ProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getPhone()
        );

    }
    @GetMapping("/security-questions")
    public List<UserQuestionAnswer> getUserSecurityQuestions(
            @AuthenticationPrincipal CustomUserDetails user) {

        return forgotPasswordService.getUserQuestionsWithMask(
                user.getUsername());
    }
    @PostMapping("/profile/security-questions")
    public String updateQuestions(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody List<UserQuestionAnswer> list) {

        return security.updateQuestions(
                user.getUsername(),
                list);
    }






}

