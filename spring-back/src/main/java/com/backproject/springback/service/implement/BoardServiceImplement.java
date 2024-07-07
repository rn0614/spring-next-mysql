package com.backproject.springback.service.implement;

import com.backproject.springback.common.TimeUtil;
import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.request.board.PostCommentRequestDto;
import com.backproject.springback.dto.request.board.UpdateBoardRequestDto;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.board.DeleteBoardResponseDto;
import com.backproject.springback.dto.response.board.GetBoardResponseDto;
import com.backproject.springback.dto.response.board.GetCommentListResponseDto;
import com.backproject.springback.dto.response.board.GetFavoriteListResponseDto;
import com.backproject.springback.dto.response.board.GetLatestBoardListResponseDto;
import com.backproject.springback.dto.response.board.GetSearchBoardListResponseDto;
import com.backproject.springback.dto.response.board.GetTop3BoardListResponseDto;
import com.backproject.springback.dto.response.board.GetUserBoardListResponseDto;
import com.backproject.springback.dto.response.board.IncreaseViewCountResponseDto;
import com.backproject.springback.dto.response.board.PatchBoardResponseDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;
import com.backproject.springback.dto.response.board.PostCommentResponseDto;
import com.backproject.springback.dto.response.board.PutFavoriteResponseDto;
import com.backproject.springback.entity.BoardEntity;
import com.backproject.springback.entity.BoardListViewEntity;
import com.backproject.springback.entity.CommentEntity;
import com.backproject.springback.entity.FavoriteEntity;
import com.backproject.springback.entity.ImageEntity;
import com.backproject.springback.entity.SearchLogEntity;
import com.backproject.springback.mapper.BoardListMapper;
import com.backproject.springback.mapper.BoardMapper;
import com.backproject.springback.mapper.CommentMapper;
import com.backproject.springback.mapper.FavoriteMapper;
import com.backproject.springback.mapper.ImageMapper;
import com.backproject.springback.mapper.SearchLogMapper;
import com.backproject.springback.mapper.UserMapper;
import com.backproject.springback.repository.resultSet.GetBoardResultSet;
import com.backproject.springback.repository.resultSet.GetCommentListResultSet;
import com.backproject.springback.repository.resultSet.GetFavoriteListResultSet;
import com.backproject.springback.service.BoardService;
import jakarta.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

  private final UserMapper userMapper;
  private final SearchLogMapper searchLogMapper;
  private final BoardListMapper boardListMapper;
  private final BoardMapper boardMapper;
  private final ImageMapper imageMapper;
  private final CommentMapper commentMapper;
  private final FavoriteMapper favoriteMapper;

  @Override
  public ResponseEntity<? super GetBoardResponseDto> getBoard(
    Integer boardNumber
  ) {
    try {
      Map<String, Object> resultSet = boardMapper.getBoard(boardNumber);
      if (resultSet == null) return GetBoardResponseDto.noExistBoard();

      List<ImageEntity> imageEntities = imageMapper.findByBoardNumber(
        boardNumber
      );

      return GetBoardResponseDto.success(resultSet, imageEntities);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
    Integer boardNumber
  ) {
    try {
      List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

      boolean existedBoard = boardMapper.existsByBoardNumber(boardNumber);
      if (!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

      resultSets = favoriteMapper.getFavoriteList(boardNumber);

      return GetFavoriteListResponseDto.success(resultSets);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
    Integer boardNumber,
    Integer limit,
    Integer startNumber
  ) {
    try {
      List<GetCommentListResultSet> resultSets = new ArrayList<>();
      boolean existedBoard = boardMapper.existsByBoardNumber(boardNumber);
      if (!existedBoard) return GetCommentListResponseDto.noExistBoard();
      resultSets =
        commentMapper.getCommentList(boardNumber, limit, startNumber);
      return GetCommentListResponseDto.success(resultSets);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  @Transactional
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    PostBoardRequestDto dto,
    String email
  ) {
    try {
      boolean existedEmail = userMapper.existsByEmail(email);
      if (!existedEmail) return PostBoardResponseDto.noExistUser();

      BoardEntity boardEntity = new BoardEntity(dto, email);
      boardMapper.insertBoard(boardEntity);

      int boardNumber = boardEntity.getBoardNumber();

      List<String> boardImageList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for (String image : boardImageList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }
      if (boardImageList.size() > 0) {
        imageMapper.saveAll(imageEntities);
      }

      return PostBoardResponseDto.success(boardNumber);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  @Transactional
  public ResponseEntity<? super PostCommentResponseDto> postComment(
    PostCommentRequestDto dto,
    Integer boardNumber,
    String email
  ) {
    try {
      Map<String, Object> boardEntity = boardMapper.findByBoardNumber(
        boardNumber
      );
      if (boardEntity == null) return PostCommentResponseDto.noExistBoard();

      boolean existedUser = userMapper.existsByEmail(email);
      if (!existedUser) return PostCommentResponseDto.noExistUser();

      CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
      commentMapper.insertComment(commentEntity);

      boardMapper.increaseCommentCount(boardNumber);

      return PostCommentResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  @Transactional
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
    Integer boardNumber,
    String email
  ) {
    try {
      // 존재하는 유저가 favorite 등록하는지 확인
      boolean existedUser = userMapper.existsByEmail(email);
      if (!existedUser) return PutFavoriteResponseDto.noExistUser();

      //
      Map<String, Object> boardEntity = boardMapper.findByBoardNumber(
        boardNumber
      );
      if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

      FavoriteEntity favoriteEntity = favoriteMapper.findByBoardNumberAndUserEmail(
        boardNumber,
        email
      );
      if (favoriteEntity == null) {
        favoriteEntity = new FavoriteEntity(email, boardNumber);
        favoriteMapper.insert(favoriteEntity);
        boardMapper.increaseFavoriteCount(boardNumber);
      } else {
        favoriteMapper.delete(favoriteEntity);
        boardMapper.decreaseFavoriteCount(boardNumber);
      }

      return PutFavoriteResponseDto.success();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(
    Integer boardNumber
  ) {
    try {
      Map<String, Object> boardEntity = boardMapper.findByBoardNumber(
        boardNumber
      );
      if (
        boardEntity == null
      ) return IncreaseViewCountResponseDto.noExistBoard();

      boardMapper.increaseViewCount(boardNumber);
      //boardMapper.save(boardEntity);
      return IncreaseViewCountResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  @Transactional
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
    Integer boardNumber,
    String email
  ) {
    try {
      boolean existedUser = userMapper.existsByEmail(email);
      if (!existedUser) return DeleteBoardResponseDto.noExistUser();

      Map<String, Object> boardEntity = boardMapper.findByBoardNumber(
        boardNumber
      );
      if (boardEntity == null) return DeleteBoardResponseDto.noExistBoard();

      String writerEmail = (String) boardEntity.get("writerEmail");
      if (
        !email.equals(writerEmail)
      ) return DeleteBoardResponseDto.noPermission();

      boardMapper.delete(boardNumber);
      imageMapper.deleteByBoardNumber(boardNumber);
      commentMapper.deleteByBoardNumber(boardNumber);
      favoriteMapper.deleteByBoardNumber(boardNumber);

      return DeleteBoardResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  @Transactional
  public ResponseEntity<? super PatchBoardResponseDto> patchBoard(
    Integer boardNumber,
    UpdateBoardRequestDto dto,
    String email
  ) {
    try {
      boolean existedEmail = userMapper.existsByEmail(email);
      if (!existedEmail) return PostBoardResponseDto.noExistUser();

      Map<String, Object> boardEntity = boardMapper.findByBoardNumber(
        boardNumber
      );
      if (boardEntity == null) return PatchBoardResponseDto.noExistBoard();

      String writerEmail = (String) boardEntity.get("writerEmail");
      boolean isWriter = writerEmail.equals(email);
      if (!isWriter) return PatchBoardResponseDto.noPermission();
      dto.setBoardNumber(boardNumber);
      // dto 객체를 받을 때 dto에 boardNumber가 없어서 dto랑 boardNumber
      boardMapper.pathBoard(dto);

      imageMapper.deleteByBoardNumber(boardNumber);
      List<String> boardImageList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for (String image : boardImageList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }
      imageMapper.saveAll(imageEntities);

      return PatchBoardResponseDto.success(boardNumber);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList(
    Integer limit,
    Integer startNumber
  ) {
    try {
      List<BoardListViewEntity> boardListViewEntities = boardListMapper.getLatestBoardList(
        limit,
        startNumber
      );
      long totalCount = boardListMapper.count();
      return GetLatestBoardListResponseDto.success(
        boardListViewEntities,
        totalCount
      );
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {
    try {
      Date beforeWeek = Date.from(
        TimeUtil.getCurrentKSTTime().toInstant().minus(7, ChronoUnit.DAYS)
      );
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
        "yyyy-MM-dd HH:mm:ss"
      );
      String sevenDaysAgo = simpleDateFormat.format(beforeWeek);
      //findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc
      List<Map<String, Object>> boardListViewEntities = boardListMapper.getTop3BoardList(
        sevenDaysAgo
      );

      return GetTop3BoardListResponseDto.success(boardListViewEntities);
    } catch (Exception exception) {
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(
    String searchWord,
    String preSearchWord
  ) {
    try {
      List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();
      //findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc
      boardListViewEntities =
        boardListMapper.getSearchBoardContainTitleNContent(
          searchWord,
          searchWord
        );

      SearchLogEntity searchLogEntity = new SearchLogEntity(
        searchWord,
        preSearchWord,
        false
      );
      searchLogMapper.insert(searchLogEntity);

      boolean relation = (preSearchWord != null);
      if (relation && !searchWord.equals(preSearchWord)) {
        searchLogEntity =
          new SearchLogEntity(preSearchWord, searchWord, relation);
        searchLogMapper.insert(searchLogEntity);
      }

      return GetSearchBoardListResponseDto.success(boardListViewEntities);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(
    String email
  ) {
    try {
      boolean existedUser = userMapper.existsByEmail(email);
      if (!existedUser) return GetUserBoardListResponseDto.noExistUser();
      List<BoardListViewEntity> boardListViewEntities = boardListMapper.findByWriterEmailOrderByWriteDatetimeDesc(
        email
      );

      return GetUserBoardListResponseDto.success(boardListViewEntities);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
}
