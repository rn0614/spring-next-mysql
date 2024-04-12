package com.backproject.springback.dto.response.board;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.ImageEntity;
import com.backproject.springback.repository.resultSet.GetBoardResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetBoardResponseDto extends ResponseDto {

  private int boardNumber;
  private String title;
  private String content;
  private List<String> boardImageList;
  private String writeDatetime;
  private String writerEmail;
  private String writerNickname;
  private String writerProfileImage;

  private GetBoardResponseDto(
    GetBoardResultSet resultSet,
    List<ImageEntity> imageEntities
  ) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    
    List<String> boardImageList = new ArrayList<>();
    for (ImageEntity imageEntity : imageEntities) {
      String boardImage = imageEntity.getImage();
      boardImageList.add(boardImage);
    }

    this.boardNumber = resultSet.getBoardNumber();
    this.title = resultSet.getTitle();
    this.content = resultSet.getContent();
    this.boardImageList = boardImageList;
    this.writeDatetime = resultSet.getWriteDatetime();
    this.writerEmail = resultSet.getWriterEmail();
    this.writerNickname = resultSet.getWriterNickname();
    this.writerProfileImage = resultSet.getWriterProfileImage();
  }

  public static ResponseEntity<GetBoardResponseDto> success(
    GetBoardResultSet resultSet,
    List<ImageEntity> imageEntities
  ) {
    GetBoardResponseDto result = new GetBoardResponseDto(
      resultSet,
      imageEntities
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
