package com.example.revpassword_manager.Reposiotory;

import com.example.revpassword_manager.Models.AllPasswordEntry;
import com.example.revpassword_manager.Models.MasterUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordEntryRepository extends JpaRepository<AllPasswordEntry,Long> {
    Optional<MasterUser> findByUsername(String username);


}
