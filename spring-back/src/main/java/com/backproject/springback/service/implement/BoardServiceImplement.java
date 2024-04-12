package com.backproject.springback.service.implement;

import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.request.board.PostCommentRequestDto;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.board.DeleteBoardResponseDto;
import com.backproject.springback.dto.response.board.GetBoardResponseDto;
import com.backproject.springback.dto.response.board.GetCommentListResponseDto;
import com.backproject.springback.dto.response.board.GetFavoriteListResponseDto;
import com.backproject.springback.dto.response.board.IncreaseViewCountResponseDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;
import com.backproject.springback.dto.response.board.PostCommentResponseDto;
import com.backproject.springback.dto.response.board.PutFavoriteResponseDto;
import com.backproject.springback.entity.BoardEntity;
import com.backproject.springback.entity.CommentEntity;
import com.backproject.springback.entity.FavoriteEntity;
import com.backproject.springback.entity.ImageEntity;
import com.backproject.springback.repository.BoardRepository;
import com.backproject.springback.repository.CommentRepository;
import com.backproject.springback.repository.FavoriteRepository;
import com.backproject.springback.repository.ImageRepository;
import com.backproject.springback.repository.UserRespository;
import com.backproject.springback.repository.resultSet.GetBoardResultSet;
import com.backproject.springback.repository.resultSet.GetCommentListResultSet;
import com.backproject.springback.repository.resultSet.GetFavoriteListResultSet;
import com.backproject.springback.service.BoardService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

  private final BoardRepository boardRepository;
  private final ImageRepository imageRepository;
  private final UserRespository userRespository;
  private final FavoriteRepository favoriteRepository;
  private final CommentRepository commentRepository;

  @Override
  public ResponseEntity<? super GetBoardResponseDto> getBoard(
    Integer boardNumber
  ) {
    try {
      GetBoardResultSet resultSet = boardRepository.getBoard(boardNumber);
      if (resultSet == null) return GetBoardResponseDto.noExistBoard();

      List<ImageEntity> imageEntities = imageRepository.findByBoardNumber(
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

      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if (!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

      resultSets = favoriteRepository.getFavoriteList(boardNumber);

      return GetFavoriteListResponseDto.success(resultSets);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
    Integer boardNumber
  ) {
    try {
      List<GetCommentListResultSet> resultSets = new ArrayList<>();
      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if (!existedBoard) return GetCommentListResponseDto.noExistBoard();
      resultSets = commentRepository.getCommentList(boardNumber);
      return GetCommentListResponseDto.success(resultSets);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    PostBoardRequestDto dto,
    String email
  ) {
    try {
      boolean existedEmail = userRespository.existsByEmail(email);
      if (!existedEmail) return PostBoardResponseDto.noExistUser();

      BoardEntity boardEntity = new BoardEntity(dto, email);
      boardRepository.save(boardEntity);

      int boardNumber = boardEntity.getBoardNumber();

      List<String> boardImageList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for (String image : boardImageList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }
      imageRepository.saveAll(imageEntities);

      return PostBoardResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super PostCommentResponseDto> postComment(
    PostCommentRequestDto dto,
    Integer boardNumber,
    String email
  ) {
    try {
      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if (boardEntity == null) return PostCommentResponseDto.noExistBoard();

      boolean existedUser = userRespository.existsByEmail(email);
      if (!existedUser) return PostCommentResponseDto.noExistUser();

      CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
      commentRepository.save(commentEntity);

      boardEntity.increaseCommentCount();
      boardRepository.save(boardEntity);

      return PostCommentResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
    Integer boardNumber,
    String email
  ) {
    try {
      // 존재하는 유저가 favorite 등록하는지 확인
      boolean existedUser = userRespository.existsByEmail(email);
      if (!existedUser) return PutFavoriteResponseDto.noExistUser();

      //
      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

      FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(
        boardNumber,
        email
      );
      if (favoriteEntity == null) {
        favoriteEntity = new FavoriteEntity(email, boardNumber);
        favoriteRepository.save(favoriteEntity);
        boardEntity.increaseFavoriteCount();
      } else {
        favoriteRepository.delete(favoriteEntity);
        boardEntity.decreaseFavoriteCount();
      }
      boardRepository.save(boardEntity);

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
      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if (
        boardEntity == null
      ) return IncreaseViewCountResponseDto.noExistBoard();

      boardEntity.increaseViewCount();
      boardRepository.save(boardEntity);
      return IncreaseViewCountResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
    Integer boardNumber,
    String email
  ) {
    try {
      boolean existedUser = userRespository.existsByEmail(email);
      if(!existedUser) return DeleteBoardResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity==null) return DeleteBoardResponseDto.noExistBoard();

      String writerEmail = boardEntity.getWriterEmail();
      if(!email.equals(writerEmail)) return DeleteBoardResponseDto.noPermission();

      imageRepository.deleteByBoardNumber(boardNumber);
      commentRepository.deleteByBoardNumber(boardNumber);
      favoriteRepository.deleteByBoardNumber(boardNumber);

      boardRepository.delete(boardEntity);

      return DeleteBoardResponseDto.success();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
}
