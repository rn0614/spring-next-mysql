package com.backproject.springback.dto.request.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String password;

  private String passwordCheck;

  @NotBlank
  private String nickname;

  @NotBlank
  private String telNumber;

  private String address;

  private String addressDetail;

  @NotNull @AssertTrue
  private Boolean agreedPersonal;

  private String role;
}
