package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.BoardListItem;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.BoardListViewEntity;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserBoardListResponseDto extends ResponseDto {

  private List<BoardListItem> userBoardList;

  private GetUserBoardListResponseDto(
    List<BoardListViewEntity> boardListViewEntities
  ) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.userBoardList = BoardListItem.getList(boardListViewEntities);
  }

  public static ResponseEntity<GetUserBoardListResponseDto> success(
    List<BoardListViewEntity> boardListViewEntities
  ) {
    GetUserBoardListResponseDto result = new GetUserBoardListResponseDto(
      boardListViewEntities
    );
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
