package com.backproject.springback.mapper;

import com.backproject.springback.entity.SearchLogEntity;
import com.backproject.springback.repository.resultSet.GetPopularListResultSet;
import com.backproject.springback.repository.resultSet.GetRelationListResultSet;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SearchLogMapper {
  List<GetPopularListResultSet> getPopularList();

  List<GetRelationListResultSet> getRelationList(String searchWord);

  boolean insert(SearchLogEntity searchLogEntity);
}
