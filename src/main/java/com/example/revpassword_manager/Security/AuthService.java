package com.example.revpassword_manager.Security;

import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        MasterUser user = MasterUser.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordEncrypted(encoder.encode(request.getPassword()))
                .build();

        userRepo.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest request) {

        MasterUser user =
                userRepo.findByUsername(request.getUsername())
                        .orElseThrow();

        if (!encoder.matches(request.getPassword(),
                user.getPasswordEncrypted()))
            throw new RuntimeException("Invalid Password");

        return jwtUtil.generateToken(user.getUsername());
    }
}
