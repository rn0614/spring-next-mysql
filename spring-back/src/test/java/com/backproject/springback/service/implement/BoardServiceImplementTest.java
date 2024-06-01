// package com.backproject.springback.service.implement;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertTrue;

// import com.backproject.springback.dto.response.board.GetTop3BoardListResponseDto;
// import com.backproject.springback.mapper.TestMapper;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import lombok.RequiredArgsConstructor;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.ResponseEntity;
// import org.springframework.test.context.ActiveProfiles;

// import com.backproject.springback.service.BoardService;

// @SpringBootTest
// @ActiveProfiles("test")
// public class BoardServiceImplementTest {
//   @Autowired
//   private TestMapper testMapper;
//   @Autowired
//   private BoardService boardService;

//   // 데이터 투입부
//   @Test
//   void getBoardDetail() {
//     Map<String, Object> expectedData = new HashMap<>();
//     expectedData.put("board_number", 4);
//     expectedData.put("title", "title");

//     // 테스트 데이터 추출(성공했을때 나오는 데이터)
//     List<Map<String, Object>> expectedResult = testMapper.getTestSet("getb");

//     // 데이터 추출부
//     ResponseEntity<? super GetTop3BoardListResponseDto> targetResultEntity = boardService.getTop3BoardList();

//     // 데이터 확인부
//     assertNotNull(targetResultEntity.getBody());

//     // 결과본문 타입확인(board 만)
//     assertTrue(
//       targetResultEntity.getBody() instanceof GetTop3BoardListResponseDto,
//       "응답 본문이 GetTop3BoardListResponseDto 타입이 아닙니다."
//     );
//     GetTop3BoardListResponseDto targetResult = (GetTop3BoardListResponseDto) targetResultEntity.getBody();
//     assertEquals(
//       expectedResult,
//       targetResult.getTop3List(),
//       "데이터가 일치하지 않습니다."
//     );
//   }
// }
