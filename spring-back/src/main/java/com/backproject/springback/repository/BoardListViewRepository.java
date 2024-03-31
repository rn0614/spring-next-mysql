package com.backproject.springback.repository;

import com.backproject.springback.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardListViewRepository
  extends JpaRepository<BoardListViewEntity, Integer> {}
