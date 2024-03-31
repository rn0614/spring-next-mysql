package com.backproject.springback.service;

import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
  ResponseEntity<? super PostBoardResponseDto> postBoard(
    PostBoardRequestDto dto,
    String email
  );
}
