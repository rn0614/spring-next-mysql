package com.backproject.springback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.BoardListItem;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto{

  private List<BoardListItem> latestList;
  private long totalCount;

  private GetLatestBoardListResponseDto(List<BoardListViewEntity> boardEntities, long totalCount){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.latestList = BoardListItem.getList(boardEntities);
    this.totalCount = totalCount;
  }

  public static ResponseEntity<GetLatestBoardListResponseDto> success(List<BoardListViewEntity> boardEntities, long totalCount){
    GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(boardEntities,totalCount);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
