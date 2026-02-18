package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.AuthResponse;
import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionMasterRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MasterController {

        private final AuthService service;
private final SecurityQuestionMasterRepository masterRepo;
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        return service.register(req);
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

}

