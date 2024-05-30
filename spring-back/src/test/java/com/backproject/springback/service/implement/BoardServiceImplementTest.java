// package com.backproject.springback.service.implement;

// import java.util.HashMap;

// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.ResponseEntity;
// import org.springframework.test.context.ActiveProfiles;

// @SpringBootTest
// @ActiveProfiles("test")
// public class BoardServiceImplementTest {
//   // 데이터 투입부
//     Map<String, Object> expectedData = new HashMap<>();
//     expectedData.put("board_number", 4);
//     expectedData.put("title", "title");

//     // 테스트 데이터 추출(성공했을때 나오는 데이터)
//     ResponseEntity<? super GetBoardDetailDto> expectedResultResponseEntity = GetBoardDetailDto.success(
//       expectedData
//     );
//     GetBoardDetailDto expectedResult = (GetBoardDetailDto) expectedResultResponseEntity.getBody();

//     // 데이터 추출부
//     ResponseEntity<? super GetBoardDetailDto> targetResultEntity = domain1Service.getBoardDetail(
//       4
//     );
        
//     // 데이터 확인부
//     assertNotNull(targetResultEntity.getBody());

//     // 결과본문 타입확인(board 만)
//     assertTrue(targetResultEntity.getBody() instanceof GetBoardDetailDto, "응답 본문이 GetBoardDetailDto 타입이 아닙니다.");
//     GetBoardDetailDto targetResult = (GetBoardDetailDto) targetResultEntity.getBody();
//     assertEquals(
//       expectedResult.getBoard(),
//       targetResult.getBoard(),
//       "데이터가 일치하지 않습니다."
//     );
// }
