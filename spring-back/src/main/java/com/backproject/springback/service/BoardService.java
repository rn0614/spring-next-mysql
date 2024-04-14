package com.backproject.springback.service;

import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.request.board.PostCommentRequestDto;
import com.backproject.springback.dto.request.board.UpdateBoardRequestDto;
import com.backproject.springback.dto.response.board.GetBoardResponseDto;
import com.backproject.springback.dto.response.board.GetFavoriteListResponseDto;
import com.backproject.springback.dto.response.board.GetCommentListResponseDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;
import com.backproject.springback.dto.response.board.PostCommentResponseDto;
import com.backproject.springback.dto.response.board.PutFavoriteResponseDto;
import com.backproject.springback.dto.response.board.IncreaseViewCountResponseDto;
import com.backproject.springback.dto.response.board.DeleteBoardResponseDto;
import com.backproject.springback.dto.response.board.PatchBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
  ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
  ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
  ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber, Integer limit, Integer startNumber);

  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
  ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto,Integer boardNumber,  String email);

  ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

  ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);

  ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

  ResponseEntity<? super PatchBoardResponseDto> patchBoard(Integer boardNumner, UpdateBoardRequestDto dto, String email);
  
}
