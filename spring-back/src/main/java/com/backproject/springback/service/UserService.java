package com.backproject.springback.service;

import org.springframework.http.ResponseEntity;

import com.backproject.springback.dto.request.user.PatchNicknameRequestDto;
import com.backproject.springback.dto.request.user.PatchProfileImageRequestDto;
import com.backproject.springback.dto.response.user.GetSignInUserResponseDto;
import com.backproject.springback.dto.response.user.GetUserResponseDto;
import com.backproject.springback.dto.response.user.PatchNicknameResponseDto;
import com.backproject.springback.dto.response.user.PatchProfileImageResponseDto;

public interface UserService {
  ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
  ResponseEntity<? super GetUserResponseDto> getUser(String email);
  ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);
  ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
}
