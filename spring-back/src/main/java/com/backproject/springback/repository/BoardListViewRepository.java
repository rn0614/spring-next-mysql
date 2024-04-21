package com.backproject.springback.repository;

import com.backproject.springback.entity.BoardListViewEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardListViewRepository
  extends JpaRepository<BoardListViewEntity, Integer> {
  List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();
  List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(
    String writeDatetime
  );

  List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(
    String title,
    String content
  );

  List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);
}
