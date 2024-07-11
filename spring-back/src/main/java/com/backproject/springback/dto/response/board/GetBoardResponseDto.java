package com.backproject.springback.dto.response.board;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.entity.ImageEntity;

import lombok.Getter;

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
    Map<String,Object> resultSet,
    List<ImageEntity> imageEntities
  ) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    List<String> boardImageList = new ArrayList<>();
    for (ImageEntity imageEntity : imageEntities) {
      String boardImage = imageEntity.getImage();
      boardImageList.add(boardImage);
    }

    this.boardNumber = (Integer) resultSet.get("boardNumber");
    this.title = (String) resultSet.get("title");
    this.content = (String) resultSet.get("content");
    this.boardImageList = boardImageList;
    this.writeDatetime = (String) resultSet.get("writeDatetime");;
    this.writerEmail = (String) resultSet.get("writerEmail");
    this.writerNickname = (String) resultSet.get("writerNickname");
    this.writerProfileImage = (String) resultSet.get("writerProfileImage");
  }

  public static ResponseEntity<GetBoardResponseDto> success(
    Map<String,Object> resultSet,
    List<ImageEntity> imageEntities
  ) {
    GetBoardResponseDto result = new GetBoardResponseDto(
      resultSet,
      imageEntities
    );
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
