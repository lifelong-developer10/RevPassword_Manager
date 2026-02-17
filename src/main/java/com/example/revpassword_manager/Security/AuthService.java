package com.example.revpassword_manager.Security;

import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public String login(LoginRequest request) {

        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        if (auth.isAuthenticated()) {
            return jwtUtil.generateToken(request.getUsername());
        }

        throw new RuntimeException("Invalid Credentials");
    }
}
