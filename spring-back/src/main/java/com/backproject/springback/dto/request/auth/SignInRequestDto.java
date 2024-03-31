package com.backproject.springback.dto.request.auth;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignInRequestDto {
  @NotBlank
  private String email;
  private String password;
}
