package com.backproject.springback.dto.response;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ResponseDto {

  private String code;
  private String message;

  // common : DB 에러
  public static ResponseEntity<ResponseDto> databaseError() {
    ResponseDto responseBody = new ResponseDto(
      ResponseCode.DATABASE_ERROR,
      ResponseMessage.DATABASE_ERROR
    );
    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(responseBody);
  }

  // common : 유효성 에러
  public static ResponseEntity<ResponseDto> validationFailed() {
    ResponseDto responseBody = new ResponseDto(
      ResponseCode.VALIDATION_FAILED,
      ResponseMessage.VALIDATION_FAILED
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
  }

  // auth : 로그인 실패
  public static ResponseEntity<ResponseDto> signInFailed() {
    ResponseDto result = new ResponseDto(
      ResponseCode.SIGN_IN_FAIL,
      ResponseMessage.SIGN_IN_FAIL
    );
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  // auth : 이메일 중복
  public static ResponseEntity<ResponseDto> duplicateEmail() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_EMAIL,
      ResponseMessage.DUPLICATION_EMAIL
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  // auth : 닉네임 중복
  public static ResponseEntity<ResponseDto> duplicateNickname() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_NICKNAME,
      ResponseMessage.DUPLICATION_NICKNAME
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  // auth : 전화번호 중복
  public static ResponseEntity<ResponseDto> duplicateTelNumber() {
    ResponseDto result = new ResponseDto(
      ResponseCode.DUPLICATION_TEL_NUMBER,
      ResponseMessage.DUPLICATION_TEL_NUMBER
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  // board : 권한 없음
  public static ResponseEntity<ResponseDto> noPermission(){
    ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
  }

  // board : board번호 없음
  public static ResponseEntity<ResponseDto> noExistBoard() {
    ResponseDto result = new ResponseDto(
      ResponseCode.NOT_EXISTED_BORAD,
      ResponseMessage.NOT_EXISTED_BORAD
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  // board : user 없음
  public static ResponseEntity<ResponseDto> noExistUser() {
    ResponseDto result = new ResponseDto(
      ResponseCode.NOT_EXISTED_USER,
      ResponseMessage.NOT_EXISTED_USER
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }
}
