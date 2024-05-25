package com.backproject.springback.mapper;

import com.backproject.springback.entity.BoardListViewEntity;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardListMapper {
  Integer count();
  List<BoardListViewEntity> getTop3BoardList(String writeDatetime);
  List<BoardListViewEntity> getSearchBoardContainTitleNContent(
    String title,
    String content
  );
  List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);
  List<BoardListViewEntity> getLatestBoardList( Integer limit, Integer startNumber);
}
