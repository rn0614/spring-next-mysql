package com.backproject.springback.dto.response.user;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.UserEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserResponseDto extends ResponseDto {

  private String email;
  private String nickname;
  private String profileImage;

  private GetUserResponseDto(UserEntity userEntity) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.email = userEntity.getEmail();
    this.nickname = userEntity.getNickname();
    this.profileImage = userEntity.getProfileImage();
  }

  public static ResponseEntity<? super GetUserResponseDto> success(
    UserEntity userEntity
  ) {
    GetUserResponseDto result = new GetUserResponseDto(userEntity);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
