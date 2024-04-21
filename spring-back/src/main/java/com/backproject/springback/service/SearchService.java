package com.backproject.springback.service;

import org.springframework.http.ResponseEntity;
import com.backproject.springback.dto.response.search.GetPopularListResponseDto;
import com.backproject.springback.dto.response.search.GetRelationListResponseDto;

public interface SearchService {
  ResponseEntity<? super GetPopularListResponseDto> getPopularList();

  ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);
}
