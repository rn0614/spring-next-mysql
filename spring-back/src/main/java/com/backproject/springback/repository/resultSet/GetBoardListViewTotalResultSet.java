package com.backproject.springback.repository.resultSet;

public interface GetBoardListViewTotalResultSet {
  Integer getBoardNumber();
  String getTitle();
  String getContent();
  String getTitleImage();
  Integer getViewCount();
  Integer getFavoriteCount();
  Integer getCommentCount();
  String getWriteDatetime();
  String getWriterEmail();
  String getWriterNickname();
  String getWriterProfileImage();
  Integer gwtTotalNumber();
}
