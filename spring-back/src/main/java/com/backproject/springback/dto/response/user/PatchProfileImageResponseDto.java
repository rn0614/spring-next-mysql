package com.backproject.springback.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;

public class PatchProfileImageResponseDto extends ResponseDto{
  private PatchProfileImageResponseDto(){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<PatchProfileImageResponseDto> success(){
    PatchProfileImageResponseDto result = new PatchProfileImageResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
