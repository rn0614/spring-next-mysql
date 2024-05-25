package com.backproject.springback.service.implement;

import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.search.GetPopularListResponseDto;
import com.backproject.springback.dto.response.search.GetRelationListResponseDto;
import com.backproject.springback.mapper.SearchLogMapper;
import com.backproject.springback.repository.resultSet.GetPopularListResultSet;
import com.backproject.springback.repository.resultSet.GetRelationListResultSet;
import com.backproject.springback.service.SearchService;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {

  private final SearchLogMapper searchLogMapper;

  @Override
  public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
    try {
      List<GetPopularListResultSet> resultSets = searchLogMapper.getPopularList();
      return GetPopularListResponseDto.success(resultSets);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetRelationListResponseDto> getRelationList(
    String searchWord
  ) {
    try {
      List<GetRelationListResultSet> resultSets = searchLogMapper.getRelationList(searchWord);
      return GetRelationListResponseDto.success(resultSets);

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
}
