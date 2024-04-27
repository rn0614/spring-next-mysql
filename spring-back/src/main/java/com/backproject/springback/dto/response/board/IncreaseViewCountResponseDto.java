package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class IncreaseViewCountResponseDto extends ResponseDto {

  private IncreaseViewCountResponseDto() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  public static ResponseEntity<IncreaseViewCountResponseDto> success() {
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(new IncreaseViewCountResponseDto());
  }
}
