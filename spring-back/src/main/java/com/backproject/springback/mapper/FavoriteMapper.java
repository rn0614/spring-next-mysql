package com.backproject.springback.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.entity.FavoriteEntity;
import com.backproject.springback.repository.resultSet.GetFavoriteListResultSet;

@Mapper
public interface FavoriteMapper {
  List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);

  // 해당 boardNumber 에 대한 내용 전부 삭제
  void deleteByBoardNumber(Integer boardNumber);

  FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String email);

  // user_email 과 board_number를 특정해서 삭제
  void insert(FavoriteEntity favoriteEntity);
  void delete(FavoriteEntity favoriteEntity);
}
