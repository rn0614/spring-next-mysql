package com.backproject.springback.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.entity.BoardEntity;
import com.backproject.springback.repository.resultSet.GetBoardResultSet;

@Mapper
public interface BoardMapper {
  BoardEntity findByBoardNumber(Integer boardNumber);
  
  GetBoardResultSet getBoard(Integer boardNumber);

  boolean existsByBoardNumber(Integer boardNumber);

  int insertBoard(BoardEntity boardEntity);

  int update(BoardEntity boardEntity);
}
