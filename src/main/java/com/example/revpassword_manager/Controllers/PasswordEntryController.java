package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.PasswordEntryRequest;
import com.example.revpassword_manager.DTOs.PasswordEntryResponse;
import com.example.revpassword_manager.Security.CustomUserDetails;
import com.example.revpassword_manager.Services.PasswordEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vault")
@RequiredArgsConstructor
public class PasswordEntryController {

    private final PasswordEntryService service;

    @PostMapping
    public PasswordEntryResponse add(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody PasswordEntryRequest request)
            throws Exception {

        return service.addEntry(user.getUsername(), request);
    }

    @GetMapping
    public List<PasswordEntryResponse> getAll(
            @AuthenticationPrincipal CustomUserDetails user)
            throws Exception {

        return service.getAllEntries(user.getUsername());
    }

    @GetMapping("/{id}")
    public PasswordEntryResponse getOne(@PathVariable Long id)
            throws Exception {

        return service.getEntry(id);
    }

    @PutMapping("/{id}")
    public PasswordEntryResponse update(
            @PathVariable Long id,
            @RequestBody PasswordEntryRequest request)
            throws Exception {

        return service.updateEntry(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteEntry(id);
    }

    @GetMapping("/favorites")
    public List<PasswordEntryResponse> favorites(
            @AuthenticationPrincipal CustomUserDetails user)
            throws Exception {

        return service.getFavorites(user.getUsername());
    }

    @GetMapping("/search")
    public List<PasswordEntryResponse> search(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam String keyword)
            throws Exception {

        return service.search(user.getUsername(), keyword);
    }

    @GetMapping("/category")
    public List<PasswordEntryResponse> filter(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam String category)
            throws Exception {

        return service.filterByCategory(
                user.getUsername(), category);
    }
}