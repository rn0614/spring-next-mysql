package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PostBoardResponseDto extends ResponseDto {

  Integer boardNumber;

  private PostBoardResponseDto(Integer boardNumber) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.boardNumber = boardNumber;
  }

  public static ResponseEntity<PostBoardResponseDto> success(
    Integer boardNumber
  ) {
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(new PostBoardResponseDto(boardNumber));
  }
}
