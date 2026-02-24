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

    public String updateQuestions(
            String username,
            List<UserQuestionAnswer> list) {

        MasterUser user =
                userRepo.findByUsername(username)
                        .orElseThrow();

        userQuestionRepo.deleteByUser(user);

        for (UserQuestionAnswer dto : list) {

            SecurityQuestionMaster q =
                    masterRepo.findById(dto.getQuestionId())
                            .orElseThrow().getQuestion();

            SecurityQuestions entity = new SecurityQuestions();
            entity.setUser(user);
            entity.setQuestion(q);
            entity.setAnswerHash(
                    encoder.encode(dto.getAnswer()));

            userQuestionRepo.save(entity);
        }

        return "Updated";
    }
    public List<SecurityQuestions> getUserQuestions(String username) {

        MasterUser user =
                userRepo.findByUsername(username).orElseThrow();

        return userQuestionRepo.findByUser(user);
    }
}