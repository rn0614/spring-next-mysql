package com.backproject.springback.repository;

import com.backproject.springback.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRespository extends JpaRepository<UserEntity, String> {
  boolean existsByEmail(String email);  // 쿼리에 존재하는지 확인
  boolean existsByNickname(String nickname);
  boolean existsByTelNumber(String telNumber);

  UserEntity findByEmail(String email);
}
