package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.BoardListItem;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.BoardListViewEntity;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetSearchBoardListResponseDto extends ResponseDto {

  private List<BoardListItem> searchList;

  private GetSearchBoardListResponseDto(
    List<BoardListViewEntity> boardListViewEntities
  ) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.searchList = BoardListItem.getList(boardListViewEntities);
  }

  public static ResponseEntity<GetSearchBoardListResponseDto> success(
    List<BoardListViewEntity> boardListViewEntities
  ) {
    GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(
      boardListViewEntities
    );
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
