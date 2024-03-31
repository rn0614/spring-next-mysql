package com.backproject.springback.dto.response.auth;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 *  회원가입 DTO
 */
@Getter
public class SignUpResponseDto extends ResponseDto {

  public SignUpResponseDto() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<SignUpResponseDto> succes() {
    SignUpResponseDto result = new SignUpResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> duplicateEmail() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_EMAIL,
      ResponseMessage.DUPLICATION_EMAIL
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> duplicateNickname() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_NICKNAME,
      ResponseMessage.DUPLICATION_NICKNAME
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> duplicateTelNumber() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_TEL_NUMBER,
      ResponseMessage.DUPLICATION_TEL_NUMBER
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }
}
