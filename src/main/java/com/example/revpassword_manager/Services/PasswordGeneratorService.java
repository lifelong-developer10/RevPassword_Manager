package com.example.revpassword_manager.Services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class PasswordGeneratorService {

  public String generate(int length) {

            String chars =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

            SecureRandom random = new SecureRandom();

            StringBuilder sb = new StringBuilder();

            for(int i=0;i<length;i++)
                sb.append(chars.charAt(random.nextInt(chars.length())));

            return sb.toString();
        }
    }

}
