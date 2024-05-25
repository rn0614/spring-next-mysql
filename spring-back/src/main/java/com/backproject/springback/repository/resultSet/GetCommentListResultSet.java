package com.backproject.springback.repository.resultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetCommentListResultSet {
  private String nickname;
  private String profileImage;
  private String writeDatetime;
  private String content;
  private String totalCount;
}
