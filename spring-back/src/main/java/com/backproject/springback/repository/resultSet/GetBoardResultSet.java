package com.backproject.springback.repository.resultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetBoardResultSet {
  private int boardNumber;
  private String title;
  private String content;
  private String writeDatetime;
  private String writerEmail;
  private String writerNickname;
  private String writerProfileImage;
}
