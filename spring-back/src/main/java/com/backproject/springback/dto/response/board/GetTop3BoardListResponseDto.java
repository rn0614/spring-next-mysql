package com.backproject.springback.dto.response.board;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class GetTop3BoardListResponseDto extends ResponseDto{
  private List<Map<String,Object>> top3List;

  private GetTop3BoardListResponseDto(List<Map<String,Object>> boardListViewEntities){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.top3List = boardListViewEntities;
  }

  public static ResponseEntity<GetTop3BoardListResponseDto> success(List<Map<String,Object>> boardListViewEntities){
    GetTop3BoardListResponseDto result = new GetTop3BoardListResponseDto(boardListViewEntities);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
