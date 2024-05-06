package com.backproject.springback.controller;

import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.request.board.PostCommentRequestDto;
import com.backproject.springback.dto.request.board.UpdateBoardRequestDto;
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
import com.backproject.springback.service.BoardService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor // final 로 선언한 변수를 bean 등록
public class BoardController {

  private final BoardService boardService;

  @GetMapping("/{boardNumber}")
  public ResponseEntity<? super GetBoardResponseDto> getboard(
    @PathVariable("boardNumber") Integer boardNumber
  ) {
    ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(
      boardNumber
    );
    return response;
  }

  @GetMapping("/{boardNumber}/favorite-list")
  public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
    @PathVariable("boardNumber") Integer boardNumber
  ) {
    ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(
      boardNumber
    );
    return response;
  }

  @PostMapping("")
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    @RequestBody @Valid PostBoardRequestDto requestBody,
    @AuthenticationPrincipal String email
  ) {
    ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(
      requestBody,
      email
    );
    return response;
  }

  @PostMapping("/{boardNumber}/comment")
  public ResponseEntity<? super PostCommentResponseDto> postComment(
    @RequestBody @Valid PostCommentRequestDto requestBody,
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {
    ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(
      requestBody,
      boardNumber,
      email
    );
    return response;
  }

  @PutMapping("/{boardNumber}/favorite")
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {
    ResponseEntity<? super PutFavoriteResponseDto> reponse = boardService.putFavorite(
      boardNumber,
      email
    );
    return reponse;
  }

  @GetMapping("/{boardNumber}/increase-view-count")
  public ResponseEntity<? super IncreaseViewCountResponseDto> increatseVieCount(
    @PathVariable("boardNumber") Integer boardNumber
  ) {
    ResponseEntity<? super IncreaseViewCountResponseDto> response = boardService.increaseViewCount(
      boardNumber
    );
    return response;
  }

  @GetMapping("/{boardNumber}/comment-list")
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
    @PathVariable("boardNumber") Integer boardNumber,
    @RequestParam(value = "limit", defaultValue = "5") Integer limit,
    @RequestParam(value = "startNumber", defaultValue = "0") Integer startNumber
  ) {
    ResponseEntity<? super GetCommentListResponseDto> reponse = boardService.getCommentList(
      boardNumber,
      limit,
      startNumber
    );
    return reponse;
  }

  @DeleteMapping("/{boardNumber}")
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {
    ResponseEntity<? super DeleteBoardResponseDto> reponse = boardService.deleteBoard(
      boardNumber,
      email
    );
    return reponse;
  }

  @PatchMapping("/{boardNumber}")
  public ResponseEntity<? super PatchBoardResponseDto> pathBoard(
    @PathVariable("boardNumber") Integer boardNumber,
    @RequestBody @Valid UpdateBoardRequestDto requestBody,
    @AuthenticationPrincipal String email
  ) {
    ResponseEntity<? super PatchBoardResponseDto> response = boardService.patchBoard(
      boardNumber,
      requestBody,
      email
    );
    return response;
  }

  @GetMapping("/latest-list")
  public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList(
    @RequestParam(value = "limit", defaultValue = "5") Integer limit,
    @RequestParam(value = "startNumber", defaultValue = "0") Integer startNumber
  ) {
    ResponseEntity<? super GetLatestBoardListResponseDto> response = boardService.getLatestBoardList(limit,startNumber);
    return response;
  }

  @GetMapping("/top-3")
  public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {
    ResponseEntity<? super GetTop3BoardListResponseDto> response = boardService.getTop3BoardList();
    return response;
  }

  @GetMapping(
    value = {
      "/search-list/{searchWord}", "/search-list/{searchWord}/{preSearchWord}",
    }
  )
  public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(
    @PathVariable("searchWord") String searchWord,
    @PathVariable(
      value = "preSearchWord",
      required = false
    ) String preSearchWord
  ) {
    ResponseEntity<? super GetSearchBoardListResponseDto> response = boardService.getSearchBoardList(
      searchWord,
      preSearchWord
    );
    return response;
  }

  @GetMapping("/user-board-list/{email}")
  public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(
    @PathVariable("email") String email
  ) {
    ResponseEntity<? super GetUserBoardListResponseDto> response = boardService.getUserBoardList(
      email
    );
    return response;
  }
}
