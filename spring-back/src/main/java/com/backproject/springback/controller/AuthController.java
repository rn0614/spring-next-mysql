package com.backproject.springback.controller;

import com.backproject.springback.dto.request.auth.SignInRequestDto;
import com.backproject.springback.dto.request.auth.SignUpRequestDto;
import com.backproject.springback.dto.response.auth.SignInResponseDto;
import com.backproject.springback.dto.response.auth.SignUpResponseDto;
import com.backproject.springback.service.AuthService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/sign-up")
  public ResponseEntity<? super SignUpResponseDto> signUp(
    @RequestBody @Valid SignUpRequestDto requestBody
  ) {
    return authService.signUp(requestBody);
  }

  @PostMapping("/sign-in")
  public ResponseEntity<? super SignInResponseDto> singIn(
    @RequestBody @Valid SignInRequestDto requestBody
  ) {
    return authService.signIn(requestBody);
  }
}
