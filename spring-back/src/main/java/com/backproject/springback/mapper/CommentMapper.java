package com.backproject.springback.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.entity.CommentEntity;
import com.backproject.springback.repository.resultSet.GetCommentListResultSet;

@Mapper
public interface CommentMapper {
  List<GetCommentListResultSet> getCommentList(Integer boardNumber, Integer limit, Integer startNumber);

  void deleteByBoardNumber(Integer boardNumber);

  void insertComment(CommentEntity commentEntity);
}
