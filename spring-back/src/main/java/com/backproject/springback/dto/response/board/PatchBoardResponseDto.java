package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchBoardResponseDto extends ResponseDto {

  Integer boardNumber;

  private PatchBoardResponseDto(Integer boardNumber) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.boardNumber =boardNumber;
  }

  public static ResponseEntity<PatchBoardResponseDto> success(Integer boardNumber) {
    return ResponseEntity.status(HttpStatus.OK).body(new PatchBoardResponseDto(boardNumber));
  }

  public static ResponseEntity<ResponseDto> noExistBoard(){
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BORAD, ResponseMessage.NOT_EXISTED_BORAD);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistUser(){
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }
  
  public static ResponseEntity<ResponseDto> noPermision(){
    ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }
}
