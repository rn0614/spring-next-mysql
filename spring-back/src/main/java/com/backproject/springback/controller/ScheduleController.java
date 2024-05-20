package com.backproject.springback.controller;

import lombok.RequiredArgsConstructor;
import com.backproject.springback.dto.response.schedule.GetScheduleListResponseDto;
import com.backproject.springback.service.ScheduleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {
  private final ScheduleService scheduleService;

  @GetMapping("/list")
  public ResponseEntity<? super GetScheduleListResponseDto> getScheduleList() {
    ResponseEntity<? super GetScheduleListResponseDto> response = scheduleService.getScheduleList();
    return response;
  }
}
