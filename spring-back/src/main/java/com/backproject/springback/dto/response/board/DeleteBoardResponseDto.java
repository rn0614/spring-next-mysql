package com.backproject.springback.dto.response.board;

import org.hibernate.sql.Delete;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class DeleteBoardResponseDto extends ResponseDto{
  
  private DeleteBoardResponseDto(){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<DeleteBoardResponseDto> success(){
    DeleteBoardResponseDto responseDto = new DeleteBoardResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  public static ResponseEntity<ResponseDto> noExistBoard(){
    ResponseDto result = new ResponseDto(
      ResponseCode.NOT_EXISTED_BORAD,
      ResponseMessage.NOT_EXISTED_BORAD
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistUser(){
    ResponseDto result = new ResponseDto(
      ResponseCode.NOT_EXISTED_USER,
      ResponseMessage.NOT_EXISTED_USER
    );
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  public static ResponseEntity<ResponseDto> noPermission(){
    ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
  }
}
