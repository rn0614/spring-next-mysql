package com.backproject.springback.entity;

import com.backproject.springback.common.TimeUtil;
import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.request.board.UpdateBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int boardNumber;

  private String title;
  private String content;
  private String writeDatetime;
  private int favoriteCount;
  private int commentCount;
  private int viewCount;
  private String writerEmail;

  public BoardEntity(PostBoardRequestDto dto, String email) {
    String writeDatetime = TimeUtil.getCurrentKSTTimeString();

    this.title = dto.getTitle();
    this.content = dto.getContent();
    this.writeDatetime = writeDatetime;
    this.favoriteCount = 0;
    this.commentCount = 0;
    this.viewCount = 0;
    this.writerEmail = email;
  }

  public void increaseViewCount() {
    this.viewCount++;
  }

  public void increaseFavoriteCount() {
    this.favoriteCount++;
  }

  public void decreaseFavoriteCount() {
    this.favoriteCount--;
  }

  public void increaseCommentCount() {
    this.commentCount++;
  }

  public void pathBoard(UpdateBoardRequestDto dto) {
    this.title = dto.getTitle();
    this.content = dto.getContent();
  }
}
