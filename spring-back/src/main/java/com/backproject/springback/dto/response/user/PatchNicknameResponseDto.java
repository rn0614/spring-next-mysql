package com.backproject.springback.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class PatchNicknameResponseDto extends ResponseDto{
  private PatchNicknameResponseDto(){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<PatchNicknameResponseDto> success(){
    PatchNicknameResponseDto result = new PatchNicknameResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
