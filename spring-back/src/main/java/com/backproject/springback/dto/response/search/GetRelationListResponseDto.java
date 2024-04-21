package com.backproject.springback.dto.response.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.repository.resultSet.GetRelationListResultSet;

import lombok.Getter;

@Getter
public class GetRelationListResponseDto extends ResponseDto {
  
  private List<String> relativeWordList;

  private GetRelationListResponseDto(List<GetRelationListResultSet> resultSets){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    List<String> relativeWordList = new ArrayList<>();
    for(GetRelationListResultSet resultSet:resultSets){
      String relativeWord = resultSet.getRelationWord();
      relativeWordList.add(relativeWord);
    }
    this.relativeWordList = relativeWordList;
  }

  public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets){
    GetRelationListResponseDto result = new GetRelationListResponseDto(resultSets);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
