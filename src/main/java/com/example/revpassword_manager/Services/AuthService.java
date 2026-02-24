package com.example.revpassword_manager.Services;

import com.example.revpassword_manager.DTOs.LoginRequest;
import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.DTOs.UserQuestionAnswer;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Models.SecurityQuestions;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;

import com.example.revpassword_manager.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
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
    private final SecurityQuestionRepository masterRepo;

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
                                                    + dto.getQuestionId())).getQuestion();

            SecurityQuestions uq =
                    new SecurityQuestions();
            if (request.getSecurityAnswers() == null ||
                    request.getSecurityAnswers().size() < 3) {

                throw new RuntimeException("Minimum 3 answers required");
            }
            uq.setUser(user);
            uq.setQuestion(master);
            uq.setAnswerHash(
                    passwordEncoder.encode(dto.getAnswer()));

            userQuestionRepo.save(uq);
        }

        return "User Registered Successfully";
    }


    public String login(LoginRequest request) {

        MasterUser user =
                userRepository.findByUsername(request.getUsername())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordEncrypted())) {

            throw new RuntimeException("Invalid password");
        }

        if (user.isTwoFactorEnabled()) {
            otpService.generateOtp(user.getUsername());
            return "OTP_REQUIRED";
        }

        return jwtUtil.generateToken(user.getUsername());
    }

    public String changePassword(
            String username,
            String oldPassword,
            String newPassword) {

        MasterUser user =
                userRepository.findByUsername(username)
                        .orElseThrow();

        if (!passwordEncoder.matches(
                oldPassword,
                user.getPasswordEncrypted())) {

            throw new RuntimeException("Old password incorrect");
        }

        user.setPasswordEncrypted(
                passwordEncoder.encode(newPassword));

        userRepository.save(user);

        return "Password Updated Successfully";
    }

}
