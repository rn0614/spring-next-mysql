package com.backproject.springback.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backproject.springback.entity.UserEntity;
import com.backproject.springback.mapper.UserMapper;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserMapper userMapper;

  // 회원 정보를 검색 후 검색 결과를 기반으로 회원 정보를 리턴
  // Controller 는 Spring Security에서 생성
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserEntity user= userMapper.findByEmail(email);
    if(user == null){
      throw new UsernameNotFoundException(email);
    }

    String role ="ROLE_" + user.getRole();

    return new User(
      user.getEmail(),
      user.getPassword(),
      AuthorityUtils.createAuthorityList(role)
    );
  }
}
