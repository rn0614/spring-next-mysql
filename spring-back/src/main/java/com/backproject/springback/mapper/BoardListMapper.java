package com.backproject.springback.mapper;

import com.backproject.springback.entity.BoardListViewEntity;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardListMapper {
  Integer count();
  List<Map<String,Object>> getTop3BoardList(String writeDatetime);
  List<BoardListViewEntity> getSearchBoardContainTitleNContent(
    String title,
    String content
  );
  List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);
  List<BoardListViewEntity> getLatestBoardList( Integer limit, Integer startNumber);
}
