package com.example.revpassword_manager.Services;

import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;

import com.example.revpassword_manager.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor

public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository; // Your JPA Repository
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;// Injected from SecurityConfig

    public String register(RegisterRequest req) {
        // 1. Check if user already exists
        if (userRepository.existsByUsername(req.getUsername())) {
            return "Error: Username is already taken!";
        }

        // 2. Create and map the new User entity
        MasterUser user = new MasterUser();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());

        // 3. ENCODE the password before saving (CRITICAL for security)
        user.setPasswordEncrypted(passwordEncoder.encode(req.getPassword()));

        // 4. Save to database
        userRepository.save(user);

        return "User registered successfully!";
    }

        public String login(LoginRequest request) {

            Authentication auth =
                    authManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            if (auth.isAuthenticated()) {

                MasterUser user =
                        userRepository.findByUsername(
                                request.getUsername()).orElseThrow();

                if (user.isTwoFactorEnabled()) {

                    otpService.generateOtp(user.getUsername());

                    return "OTP_REQUIRED";
                }

                return jwtUtil.generateToken(user.getUsername());
            }

            throw new RuntimeException("Invalid Credentials");
        }

}
