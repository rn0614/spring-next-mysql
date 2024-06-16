package com.backproject.springback.repository;

import com.backproject.springback.entity.BoardListViewEntity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardListViewRepository
  extends JpaRepository<BoardListViewEntity, Integer> {

  List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(
    String writeDatetime
  );

  List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(
    String title,
    String content
  );

  List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);

  @Query(
    value = """
      SELECT 
          B.board_number,
          B.title,
          B.content,
          I.image AS title_image,
          B.view_count,
          B.favorite_count,
          B.comment_count,
          B.write_datetime,
          B.writer_email,
          U.nickname AS writer_nickname,
          U.profile_image AS writer_profile_image
      FROM 
          board AS B
      INNER JOIN 
          user AS U ON B.writer_email = U.email
      LEFT JOIN (
          SELECT 
              board_number,
              MAX(`sequence`) AS max_sequence
          FROM 
              image
          GROUP BY 
              board_number
      ) AS MaxSeq ON B.board_number = MaxSeq.board_number
      LEFT JOIN image AS I ON MaxSeq.board_number = I.board_number AND MaxSeq.max_sequence = I.sequence
      ORDER BY 
          B.write_datetime DESC
      LIMIT ?1 OFFSET ?2
      """,
    nativeQuery = true
  )
  List<BoardListViewEntity> getLatestBoardList( Integer limit, Integer startNumber);
}
