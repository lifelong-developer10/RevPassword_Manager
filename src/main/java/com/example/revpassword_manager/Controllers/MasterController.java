package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.AuthResponse;
import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.ProfileResponse;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionMasterRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MasterController {

        private final AuthService service;
private final SecurityQuestionMasterRepository masterRepo;
private final UserRepository userRepo;

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
    @GetMapping("/security-questions")
    public List<SecurityQuestionMaster> getAllQuestions() {
        return masterRepo.findAll();
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
}

