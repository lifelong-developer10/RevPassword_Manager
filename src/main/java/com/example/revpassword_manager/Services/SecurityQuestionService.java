package com.example.revpassword_manager.Services;

import com.example.revpassword_manager.DTOs.UserQuestionAnswer;
import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Models.SecurityQuestionMaster;
import com.example.revpassword_manager.Models.SecurityQuestions;
import com.example.revpassword_manager.Reposiotory.SecurityQuestionRepository;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SecurityQuestionService {

    private final UserRepository userRepo;
    private final SecurityQuestionRepository userQuestionRepo;
    private final SecurityQuestionRepository masterRepo;
    private final PasswordEncoder encoder;

    public String updateUserQuestions(
            String username,
            List<UserQuestionAnswer> request) {

        MasterUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // delete old questions
        userQuestionRepo.deleteByUser(user);

        List<SecurityQuestions> list = new ArrayList<>();

        for (UserQuestionAnswer dto : request) {

            SecurityQuestionMaster question =
                    masterRepo.findById(dto.getQuestionId())
                            .orElseThrow(() ->
                                    new RuntimeException("Question not found")).getQuestion();

            SecurityQuestions uq = new SecurityQuestions();

            uq.setUser(user);
            uq.setQuestion(question);
            uq.setAnswerHash(
                    encoder.encode(dto.getAnswer())
            );

            list.add(uq);
        }

        userQuestionRepo.saveAll(list);

        return "Security Questions Updated Successfully";
    }
}