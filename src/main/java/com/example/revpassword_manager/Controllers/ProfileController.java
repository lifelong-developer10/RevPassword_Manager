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
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody MasterUser request) {

        return authService.updateProfile(
                user.getUsername(),
                request);
    }

    @PostMapping("/change-password")
    public String changePassword(
            String username,
            ChangePasswordRequest req) {

        MasterUser user =
                userRepository.findByUsername(username)
                        .orElseThrow();

        if (!encode.matches(
                req.getCurrentPassword(),
                user.getPasswordEncrypted())) {

            throw new RuntimeException("Wrong current password");
        }

        if (!req.getNewPassword()
                .equals(req.getConfirmPassword())) {

            throw new RuntimeException("Passwords do not match");
        }

        user.setPasswordEncrypted(
                encode.encode(req.getNewPassword()));

        userRepository.save(user);

        return "Password Updated";
    }
    @GetMapping("/security-questions")
    public List<UserQuestionAnswer> getUserSecurityQuestions(
            @AuthenticationPrincipal CustomUserDetails user) {

        return forgotPasswordService.getUserQuestionsWithMask(
                user.getUsername());
    }
    @PutMapping("/security-questions")
    public String updateQuestions(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody List<UserQuestionAnswer> list) {

        return security.updateQuestions(
                user.getUsername(),
                list);
    }

    @PostMapping("/2fa")
    public String update2FA(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody TwoFactorRequest request) {

        return twoFactorService.updateTwoFactor(
                user.getUsername(),
                request.isEnabled());

    }
    @GetMapping("/profile/security-questions")
    public List<SecurityQuestions> getUserQuestions(Authentication auth) {
        return security.getUserQuestions(auth.getName());
    }
}