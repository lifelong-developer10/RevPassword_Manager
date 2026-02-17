package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.Security.AuthService;
import lombok.RequiredArgsConstructor;
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
        public String login(@RequestBody LoginRequest req) {
            return service.login(req);
        }
    }

