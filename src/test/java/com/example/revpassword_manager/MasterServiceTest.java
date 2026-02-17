package com.example.revpassword_manager;

import com.example.revpassword_manager.DTOs.RegisterRequest;
import com.example.revpassword_manager.Reposiotory.UserRepository;
import com.example.revpassword_manager.Security.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MasterServiceTest {



        @Mock
        private UserRepository userRepo;

        @InjectMocks
        private AuthService authService;

        @Test
        void testRegister() {

            RegisterRequest req = new RegisterRequest();
            req.setUsername("test");

            String result = authService.register(req);

            assertEquals("User Registered Successfully", result);
        }
    }


