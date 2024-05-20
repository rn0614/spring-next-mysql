package com.backproject.springback.dto.response.schedule;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.ScheduleListItem;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.repository.resultSet.GetScheduleListResultSet;

import lombok.Getter;

@Getter
public class GetScheduleListResponseDto extends ResponseDto {
  private List<ScheduleListItem> scheduleList;

  public GetScheduleListResponseDto(List<GetScheduleListResultSet> scheduleResultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.scheduleList = ScheduleListItem.getScheduleList(scheduleResultSets);
  }
  

  public static ResponseEntity<GetScheduleListResponseDto> success(List<GetScheduleListResultSet> scheduleEntities){
    GetScheduleListResponseDto result= new GetScheduleListResponseDto(scheduleEntities);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
