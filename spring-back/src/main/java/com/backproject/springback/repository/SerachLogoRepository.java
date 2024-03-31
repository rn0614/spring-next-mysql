package com.backproject.springback.repository;

import com.backproject.springback.entity.SearchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SerachLogoRepository
  extends JpaRepository<SearchEntity, Integer> {}
