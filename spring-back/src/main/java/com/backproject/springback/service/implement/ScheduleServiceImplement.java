package com.backproject.springback.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.schedule.GetScheduleListResponseDto;
import com.backproject.springback.mapper.ScheduleMapper;
import com.backproject.springback.repository.resultSet.GetScheduleListResultSet;
import com.backproject.springback.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImplement implements ScheduleService{
  
  private final ScheduleMapper scheduleMapper;

  @Override
  public ResponseEntity<? super GetScheduleListResponseDto> getScheduleList() {
    try {
      List<GetScheduleListResultSet> resultSets = scheduleMapper.getScheduleList();
      return GetScheduleListResponseDto.success(resultSets);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
}
