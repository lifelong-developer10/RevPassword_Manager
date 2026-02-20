package com.example.revpassword_manager.Services;

import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.DTOs.UserQuestionAnswer;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Models.SecurityQuestions;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionMasterRepository;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionRepository;
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
   private final SecurityQuestionRepository userQuestionRepo;
    private final SecurityQuestionMasterRepository masterRepo;
    public String register(RegisterRequest request) {

        if (request.getSecurityAnswers().size() != 3)
            throw new RuntimeException("Select exactly 3 questions");

        MasterUser user = new MasterUser();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        user.setPasswordEncrypted(
                passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        for (UserQuestionAnswer dto :
                request.getSecurityAnswers()) {

            SecurityQuestionMaster master =
                    masterRepo.findById(dto.getQuestionId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Invalid Question ID: "
                                                    + dto.getQuestionId()));

            SecurityQuestions uq =
                    new SecurityQuestions();

            uq.setUser(user);
            uq.setQuestion(master);
            uq.setAnswerHash(
                    passwordEncoder.encode(dto.getAnswer()));

            userQuestionRepo.save(uq);
        }

        return "User Registered Successfully";
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
