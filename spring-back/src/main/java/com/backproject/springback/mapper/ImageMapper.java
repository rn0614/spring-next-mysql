package com.backproject.springback.mapper;

import java.util.List;
import com.backproject.springback.entity.ImageEntity;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImageMapper {
  List<ImageEntity> findByBoardNumber(Integer boardNumber);

  int deleteByBoardNumber(Integer boardNumber);

  int saveAll(List<ImageEntity> imageEntities);
}
