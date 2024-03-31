package com.backproject.springback.service;

import org.springframework.http.ResponseEntity;

import com.backproject.springback.dto.request.auth.SignInRequestDto;
import com.backproject.springback.dto.request.auth.SignUpRequestDto;
import com.backproject.springback.dto.response.auth.SignInResponseDto;
import com.backproject.springback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
  ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
  ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
