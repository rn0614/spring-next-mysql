package com.backproject.springback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.user.GetSignInUserResponseDto;
import com.backproject.springback.entity.UserEntity;
import com.backproject.springback.repository.UserRespository;
import com.backproject.springback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

  private final UserRespository userRespository;

  @Override
  public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
    
    UserEntity userEntity = null;

    try{
      userEntity = userRespository.findByEmail(email);
      if(userEntity== null) return GetSignInUserResponseDto.notExistUser();

      return GetSignInUserResponseDto.success(userEntity);
    }catch(Exception exception){
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
  
}
