package com.example.revpassword_manager.Services;

import com.example.revpassword_manager.DTOs.VerifySecurityAnswersRequest;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestions;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepo;
    private final SecurityQuestionRepository questionRepo;
    private final PasswordEncoder encoder;

    // STEP 1 — Get Questions
    public List<String> getQuestions(String username) {

        MasterUser user =
                userRepo.findByUsername(username).orElseThrow();

        return questionRepo.findByUser(user)
                .stream()
                .map(SecurityQuestions::getQuestion)
                .toList();
    }

    // STEP 2 — Verify Answers
    public boolean verifyAnswers(
            VerifySecurityAnswersRequest request) {

        MasterUser user =
                userRepo.findByUsername(
                                request.getUsername())
                        .orElseThrow();

        List<SecurityQuestions> questions =
                questionRepo.findByUser(user);

        Map<String, String> provided =
                request.getAnswers();

        int matchCount = 0;

        for (SecurityQuestions q : questions) {

            String providedAnswer =
                    provided.get(q.getQuestion());

            if (providedAnswer != null &&
                    encoder.matches(
                            providedAnswer,
                            q.getAnswerHash())) {

                matchCount++;
            }
        }

        // Require at least 3 correct
        return matchCount >= 3;
    }

    // STEP 3 — Reset Password
    public String resetPassword(
            ResetPasswordRequest request) {

        MasterUser user =
                userRepo.findByUsername(
                                request.getUsername())
                        .orElseThrow();

        user.setPasswordEncrypted(
                encoder.encode(
                        request.getNewPassword()));

        userRepo.save(user);

        return "Password Reset Successful";
    }
}
