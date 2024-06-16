package com.backproject.springback.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.backproject.springback.entity.UserEntity;


@Mapper
public interface UserMapper {
  boolean existsByEmail(String email);  // 쿼리에 존재하는지 확인
  boolean existsByNickname(String nickname);
  boolean existsByTelNumber(String telNumber);
  UserEntity findByEmail(String email);
  boolean insert(UserEntity userEntity);
  boolean update(UserEntity userEntity);
}
