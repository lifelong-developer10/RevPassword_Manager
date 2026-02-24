package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.DTOs.ChangePasswordRequest;
import com.example.revpassword_manager.DTOs.ProfileResponse;
import com.example.revpassword_manager.DTOs.TwoFactorRequest;
import com.example.revpassword_manager.DTOs.UserQuestionAnswer;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestions;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Security.CustomUserDetails;
import com.example.revpassword_manager.Services.AuthService;
import com.example.revpassword_manager.Services.ForgotPasswordService;
import com.example.revpassword_manager.Services.SecurityQuestionService;
import com.example.revpassword_manager.Services.TwoFactorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
private final AuthService authService;
private final PasswordEncoder encode;
    private final SecurityQuestionService security;
    private final TwoFactorService twoFactorService;
    private final ForgotPasswordService forgotPasswordService;

    @GetMapping
    public ProfileResponse getProfile(Authentication auth) {

        String username = auth.getName();

        MasterUser user =
                userRepository.findByUsername(username)
                        .orElseThrow();

        return new ProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getPhone()
        );
    }
    @PutMapping
    public MasterUser updateProfile(
            Authentication auth,
            @RequestBody MasterUser request) {

        String username = auth.getName();

        return authService.updateProfile(username, request);
    }
    @PostMapping("/change-password")
    public String changePassword(
            Authentication auth,
            @RequestBody ChangePasswordRequest req) {

        String username = auth.getName();

        return authService.changePassword(username, req);
    }

    @GetMapping("/security-questions")
    public List<UserQuestionAnswer> getUserSecurityQuestions(
            @AuthenticationPrincipal CustomUserDetails user) {

        return forgotPasswordService.getUserQuestionsWithMask(
                user.getUsername());
    }

    @PutMapping("/security-questions")
    public Map<String, String> updateQuestions(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody List<UserQuestionAnswer> list) {

        return security.updateQuestions(user.getUsername(), list);
    }

    @PostMapping("/2fa")
    public String update2FA(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody TwoFactorRequest request) {

        return twoFactorService.updateTwoFactor(
                user.getUsername(),
                request.isEnabled());

    }

}