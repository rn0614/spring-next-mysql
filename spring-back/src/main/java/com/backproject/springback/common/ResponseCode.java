package com.backproject.springback.common;

public interface ResponseCode {

  // HTTP STATUS 200
  String SUCCESS = "SU";
  
  // HTTP STATUS 400
  String VALIDATION_FAILED ="VF";
  String DUPLICATION_EMAIL ="DE";
  String DUPLICATION_NICKNAME ="DN";
  String DUPLICATION_TEL_NUMBER ="DT";
  String NOT_EXISTED_USER ="NU";
  String NOT_EXISTED_BORAD ="NB";
  
  // HTTP STATUS 401
  String SIGN_IN_FAIL ="SF";
  String AUTHORIZATION_FAIL ="AF";

  // HTTP STATUS 403
  String NO_PERMISSION ="NP";

  // HTTP STATUS 500
  String DATABASE_ERROR ="DBE";

}
