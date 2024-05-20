package com.backproject.springback.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.backproject.springback.repository.resultSet.GetScheduleListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleListItem {
  private Integer id;
  private String text;
  private Integer startTime;
  private Integer endTime;
  private String type;

  public ScheduleListItem(GetScheduleListResultSet scheduleResultSets) {
    this.id = scheduleResultSets.getId();
    this.text = scheduleResultSets.getText();
    this.startTime = scheduleResultSets.getStartTime();
    this.endTime = scheduleResultSets.getEndTime();
    this.type = scheduleResultSets.getType();
  }

  public static List<ScheduleListItem> getScheduleList(List<GetScheduleListResultSet> scheduleResultSets){
    List<ScheduleListItem> list = new ArrayList<ScheduleListItem>();
    for(GetScheduleListResultSet scheduleResultSet:scheduleResultSets){
      ScheduleListItem scheduleListItem = new ScheduleListItem(scheduleResultSet);
      list.add(scheduleListItem);
    }
    return list;
  }
}
