package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.AuthResponse;
import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MasterController {

        private final AuthService service;

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


}

