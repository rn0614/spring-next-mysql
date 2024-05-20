package com.backproject.springback.service;

import org.springframework.http.ResponseEntity;
import com.backproject.springback.dto.response.schedule.GetScheduleListResponseDto;

public interface ScheduleService {
    ResponseEntity<? super GetScheduleListResponseDto> getScheduleList();
}
