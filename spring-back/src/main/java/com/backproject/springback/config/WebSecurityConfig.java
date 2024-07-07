package com.backproject.springback.config;

import com.backproject.springback.filter.JwtAuthenticationFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

  private final UserDetailsService detailsService;

  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  // 패스워드 인코더
  @Bean
  BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // CORS 설정
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://spring.koosang-project.com","https://spring.koosang-project.com"));
    config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","PATCH"));
    config.setAllowCredentials(true);
    config.setExposedHeaders(Arrays.asList("Authorization", "Authorization-refresh"));
    config.setAllowedHeaders(Arrays.asList("Authorization", "Authorization-refresh", "Cache-Control", "Content-Type"));
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  // spring security 설정
  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //CORS 설정변경
    http.cors(cors-> cors.configurationSource(corsConfigurationSource()));

    //CSRF 토큰을 비활성화 한다
    http.csrf(csrfConfigurer -> csrfConfigurer.disable()); // scrf 토큰을 받지 않겠다.

    // 인증/인가 설정
    http.authorizeHttpRequests(authorize ->
      authorize
        // URL 경로 member 에는 인증 성공필요
        //.requestMatchers("/api/v1/schedule/**")
        //.authenticated()
        // // URL 경로 manager 에는 인증 성공 + MANAGER 권한
        //.requestMatchers(new AntPathRequestMatcher("/api/d1/manager/**"))
        //.hasAnyRole("MANAGER", "ADMIN")
        // .requestMatchers(new AntPathRequestMatcher("/api/d1/admin/**"))
        // .hasRole("ADMIN")
        // 나머지 모든 권한에 한해 모두 접근 허용
        .anyRequest()
        .permitAll()
    );

    // 로그인 설정
    http.formLogin(auth ->
      auth
        //.successHandler(new MyAuthenticationSuccessHandler())
        .failureHandler((request, response, authentication) -> {
          System.out.println("인증실패");
          response.setStatus(401);
        })
        .loginProcessingUrl("/api/d1/login")
    );

    // 권한 없음 페이지
    http.exceptionHandling(exception ->
      exception.authenticationEntryPoint(
        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
      )
    );

    // 로그아웃 설정
    http.logout(auth ->
      auth
        .logoutSuccessHandler((request, response, authentication) -> {
          System.out.println("logout성공");
          response.setStatus(200);
        })
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID")
        .logoutUrl("/api/d1/logout")
        .permitAll()
    );

    // 사용자 정의 UserDetailsService 적용
    http.userDetailsService(detailsService);

    // 다중로그인 허용여부 설정
    // http.sessionManagement(auth ->
    //   auth.maximumSessions(10).maxSessionsPreventsLogin(true)
    // );

    http.sessionManagement(auth -> auth.sessionFixation().changeSessionId());

    http.addFilterBefore(
      jwtAuthenticationFilter,
      UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
    HttpServletRequest request,
    HttpServletResponse response,
    AuthenticationException authException
  ) throws IOException, ServletException {
    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    response
      .getWriter()
      .write("{\"code\":\"NP\",\"message\":\"Do not have permission.\"}");
  }
}
