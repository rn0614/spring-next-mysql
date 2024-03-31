package com.backproject.springback.entity;

import com.backproject.springback.dto.request.auth.SignUpRequestDto;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user")
public class UserEntity {

  @Id
  private String email;

  private String password;
  private String nickname;
  private String telNumber;
  private String address;
  private String addressDetail;
  private String profileImage;
  private boolean agreedPersonal;

  public UserEntity(SignUpRequestDto dto) {
    this.email = dto.getEmail();
    this.password=dto.getPassword();
    this.nickname= dto.getNickname();
    this.telNumber= dto.getTelNumber();
    this.address = dto.getAddress();
    this.addressDetail = dto.getAddressDetail();
    this.agreedPersonal = dto.getAgreedPersonal();
  }
}
