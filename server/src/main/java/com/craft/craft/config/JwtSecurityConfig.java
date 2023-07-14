package com.craft.craft.config;

import com.craft.craft.model.user.RoleName;
import com.craft.craft.security.jwt.JwtConfigurer;
import com.craft.craft.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .httpBasic().disable()
//                .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()).and()
                .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorize) -> authorize
                        .antMatchers("/user/**", "/api/v1/auth/**",

                        "/v2/api-docs/**","/swagger-ui.html","/swagger-ui/**", "/v2/api-docs",
                        "/configuration/ui", "/swagger-resources/**", "/configuration/security",
                        "/swagger-ui.html", "/webjars/**", "/v3/api-docs/swagger-config", "/v3/api-docs/**",

                                "/api/v1/craft-info-card/trainer/**","/api/v1/train/**","/api/v1/news/**"

                        ).permitAll()
                        .antMatchers("/test/base/**").hasAuthority(RoleName.BASE.name())
                        .antMatchers("/test/admin/**").hasAuthority(RoleName.ADMIN.name())
                        .anyRequest().authenticated()
                )
                .apply(new JwtConfigurer(jwtTokenProvider))
                ;

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        List<String> allowedOriginPatterns = new ArrayList<>();
        allowedOriginPatterns.add("*");
        config.setAllowedOriginPatterns(allowedOriginPatterns);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}