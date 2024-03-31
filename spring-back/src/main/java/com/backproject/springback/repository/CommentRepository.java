package com.backproject.springback.repository;

import com.backproject.springback.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository
  extends JpaRepository<CommentEntity, Integer> {}
