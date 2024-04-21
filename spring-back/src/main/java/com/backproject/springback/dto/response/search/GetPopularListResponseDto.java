package com.backproject.springback.dto.response.search;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.repository.resultSet.GetPopularListResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetPopularListResponseDto extends ResponseDto {

  private List<String> popularWordList;

  private GetPopularListResponseDto(List<GetPopularListResultSet> resultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    List<String> popularWordList = new ArrayList<>();
    for (GetPopularListResultSet resultSet : resultSets) {
      String popluarWord = resultSet.getSearchWord();
      popularWordList.add(popluarWord);
    }

    this.popularWordList = popularWordList;
  }

  public static ResponseEntity<GetPopularListResponseDto> success(List<GetPopularListResultSet> resultSets) {
    GetPopularListResponseDto result = new GetPopularListResponseDto(resultSets);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
