package com.pweb.eventhorizon.service;

import com.pweb.eventhorizon.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("No token passed");
        }

        final String jwt = authHeader.substring(7);
        var storedToken = tokenRepository.findByToken(jwt).orElseThrow();
        storedToken.setExpired(true);
        storedToken.setRevoked(true);
        tokenRepository.save(storedToken);
    }
}