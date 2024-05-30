package com.backproject.springback.config;

import java.time.format.DateTimeFormatter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UtilConfig {
  @Bean
  DateTimeFormatter dateTimeFormatter() {
    return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
  }
}
