package com.backproject.springback.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class PutFavoriteResponseDto extends ResponseDto{

  public PutFavoriteResponseDto() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<PutFavoriteResponseDto> success(){
    PutFavoriteResponseDto result = new PutFavoriteResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistBoard(){
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BORAD, ResponseMessage.NOT_EXISTED_BORAD);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistUser(){
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }
}
