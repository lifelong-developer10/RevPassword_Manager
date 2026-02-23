package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.DTOs.ProfileResponse;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;

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
}