package com.backproject.springback.repository;

import com.backproject.springback.entity.CommentEntity;
import com.backproject.springback.repository.resultSet.GetCommentListResultSet;
import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository
  extends JpaRepository<CommentEntity, Integer> {
  @Query(
    value = """
      SELECT
        U.nickname AS nickname,
        U.profile_image AS profileImage,
        C.write_datetime AS writeDatetime,
        C.content AS content,
        COUNT(*) OVER() AS totalCount
      FROM comment AS C
      INNER JOIN user AS U
      ON C.user_email = U.email
      WHERE C.board_number =?1
      ORDER BY write_datetime DESC
      LIMIT ?2 OFFSET ?3
      """,
    nativeQuery = true
  )
  List<GetCommentListResultSet> getCommentList(Integer boardNumber, Integer limit, Integer startNumber);

  @Transactional
  void deleteByBoardNumber(Integer boardNumber);
}
