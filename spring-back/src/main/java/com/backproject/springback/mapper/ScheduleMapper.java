package com.backproject.springback.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.repository.resultSet.GetScheduleListResultSet;

@Mapper
public interface ScheduleMapper {
  List<GetScheduleListResultSet> getScheduleList();
}
