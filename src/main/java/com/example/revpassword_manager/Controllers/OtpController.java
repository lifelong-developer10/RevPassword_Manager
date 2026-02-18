package com.example.revpassword_manager.Controllers;

import com.example.revpassword_manager.DTOs.OtpVerifyRequest;
import com.example.revpassword_manager.DTOs.TwoFactorRequest;
import com.example.revpassword_manager.Security.CustomUserDetails;
import com.example.revpassword_manager.Services.OtpService;
import com.example.revpassword_manager.Services.TwoFactorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;
    private final TwoFactorService twoFactorService;

    @PostMapping("/generate")
    public String generate(
            @AuthenticationPrincipal CustomUserDetails user) {

        return otpService.generateOtp(user.getUsername());
    }

    @PostMapping("/verify")
    public String verify(@RequestBody OtpVerifyRequest request) {

        boolean result =
                otpService.verifyOtp(
                        request.getUsername(),
                        request.getCode());

        return result ? "OTP Verified" : "Invalid OTP";
    }

    @PostMapping("/2fa")
    public String update2FA(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody TwoFactorRequest request) {

        return twoFactorService.updateTwoFactor(
                user.getUsername(),
                request.isEnabled());
    }
}