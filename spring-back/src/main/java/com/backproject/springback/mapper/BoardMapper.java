package com.backproject.springback.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.dto.request.board.UpdateBoardRequestDto;
import com.backproject.springback.entity.BoardEntity;

@Mapper
public interface BoardMapper {
  Map<String,Object> findByBoardNumber(Integer boardNumber);
  
  Map<String,Object> getBoard(Integer boardNumber);

  boolean existsByBoardNumber(Integer boardNumber);

  int insertBoard(BoardEntity boardEntity);

  int update(BoardEntity boardEntity);

  int increaseCommentCount(Integer boardNumber);

  int increaseFavoriteCount(Integer boardNumber);
  int decreaseFavoriteCount(Integer boardNumber);

  int increaseViewCount(Integer boardNumber);

  int delete(Integer boardNumber);

  int pathBoard(UpdateBoardRequestDto dto);
}
