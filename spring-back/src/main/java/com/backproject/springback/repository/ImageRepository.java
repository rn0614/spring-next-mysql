package com.backproject.springback.repository;

import com.backproject.springback.entity.ImageEntity;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
  List<ImageEntity> findByBoardNumber(Integer boardNumber);

  @Transactional
  void deleteByBoardNumber(Integer boardNumber);
}
