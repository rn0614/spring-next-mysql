package com.backproject.springback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backproject.springback.entity.ScheduleEntity;
import com.backproject.springback.repository.resultSet.GetScheduleListResultSet;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Integer> {
  @Query(
    value="""
      SELECT 
        id as id,
        text as text,
        start_time as startTime,
        end_time as endTime,
        type as type
      FROM time_scheduler
      """,nativeQuery=true
  )
  List<GetScheduleListResultSet> getScheduleList();

}
