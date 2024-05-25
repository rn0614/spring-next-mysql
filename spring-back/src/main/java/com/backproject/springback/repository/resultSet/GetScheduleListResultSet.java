package com.backproject.springback.repository.resultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetScheduleListResultSet {
  private int id;
  private String text;
  private int startTime;
  private int endTime;
  private String type;
}
