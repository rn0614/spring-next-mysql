package com.backproject.springback.repository;

import com.backproject.springback.entity.FavoriteEntity;
import com.backproject.springback.entity.primaryKey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository
  extends JpaRepository<FavoriteEntity, FavoritePk> {}
