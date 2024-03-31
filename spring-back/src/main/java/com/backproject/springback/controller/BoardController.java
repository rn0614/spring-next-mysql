package com.backproject.springback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backproject.springback.service.BoardService;
import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
  private final BoardService boardService;

  @PostMapping("")
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    @RequestBody @Valid PostBoardRequestDto requestBody,
    @AuthenticationPrincipal String email
  ){
    ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
    return response;
  }
  
}
