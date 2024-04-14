package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.CommentListItem;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.repository.resultSet.GetCommentListResultSet;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetCommentListResponseDto extends ResponseDto {

  private List<CommentListItem> commentList;

  public GetCommentListResponseDto(List<GetCommentListResultSet> resultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.commentList = CommentListItem.copyItem(resultSets);
  }

  public static ResponseEntity<GetCommentListResponseDto> success(
    List<GetCommentListResultSet> resultSets
  ) {
    GetCommentListResponseDto result = new GetCommentListResponseDto(
      resultSets
    );
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistBoard() {
    ResponseDto result = new ResponseDto(
      ResponseCode.NOT_EXISTED_BORAD,
      ResponseMessage.NOT_EXISTED_BORAD
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }
}
