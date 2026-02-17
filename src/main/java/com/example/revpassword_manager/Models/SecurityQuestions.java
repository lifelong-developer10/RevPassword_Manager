package com.example.revpassword_manager.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SecurityQuestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String answerHash;

    @ManyToOne
    private MasterUser user;
}
