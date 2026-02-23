package com.example.revpassword_manager.Controllers;


import com.example.revpassword_manager.Models.MasterUser;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;

    @GetMapping
    public MasterUser getProfile(Authentication auth) {

        return userRepository
                .findByUsername(auth.getName())
                .orElseThrow();
    }

    @PutMapping
    public MasterUser updateProfile(
            Authentication auth,
            @RequestBody MasterUser updated) {

        MasterUser user = userRepository
                .findByUsername(auth.getName())
                .orElseThrow();

        user.setEmail(updated.getEmail());
        user.setPhone(updated.getPhone());

        return userRepository.save(user);
    }
}