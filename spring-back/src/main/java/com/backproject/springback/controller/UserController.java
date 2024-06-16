package com.backproject.springback.controller;

import com.backproject.springback.dto.request.user.PatchNicknameRequestDto;
import com.backproject.springback.dto.request.user.PatchProfileImageRequestDto;
import com.backproject.springback.dto.response.user.GetSignInUserResponseDto;
import com.backproject.springback.dto.response.user.GetUserResponseDto;
import com.backproject.springback.dto.response.user.PatchNicknameResponseDto;
import com.backproject.springback.dto.response.user.PatchProfileImageResponseDto;
import com.backproject.springback.service.UserService;
import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/{email}")
  public ResponseEntity<? super GetUserResponseDto> getUser(
    @PathVariable("email") String email
  ) {
    return userService.getUser(email);
  }

  @GetMapping("")
  public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(
    @AuthenticationPrincipal String email
  ) {
    return userService.getSignInUser(email);
  }

  @PatchMapping("/nickname")
  public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
    @RequestBody @Valid PatchNicknameRequestDto dto,
    @AuthenticationPrincipal String email
  ){
    return userService.patchNickname(dto, email);
  }

  @PatchMapping("/profile-image")
  public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(
    @RequestBody @Valid PatchProfileImageRequestDto dto,
    @AuthenticationPrincipal String email
  ){
    return userService.patchProfileImage(dto, email);
  }
}
