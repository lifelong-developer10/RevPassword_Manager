package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.DTOs.ChangePasswordRequest;
import com.example.revpassword_manager.DTOs.ProfileResponse;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Security.CustomUserDetails;
import com.example.revpassword_manager.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
private final AuthService authService;
private final PasswordEncoder encode;
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

    @PutMapping("/profile")
    public MasterUser updateProfile(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody MasterUser request) {

        return authService.updateProfile(
                user.getUsername(),
                request);
    }
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

}