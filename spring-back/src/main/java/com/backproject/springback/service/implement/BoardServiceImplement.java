package com.backproject.springback.service.implement;

import com.backproject.springback.dto.request.board.PostBoardRequestDto;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.board.PostBoardResponseDto;
import com.backproject.springback.entity.BoardEntity;
import com.backproject.springback.entity.ImageEntity;
import com.backproject.springback.repository.BoardRepository;
import com.backproject.springback.repository.ImageRepository;
import com.backproject.springback.repository.UserRespository;
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

  @Override
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    PostBoardRequestDto dto,
    String email
  ) {
    try {
      boolean existedEmail = userRespository.existsByEmail(email);
      if (!existedEmail) return PostBoardResponseDto.notExistUser();

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
}
