package com.craft.craft.config;

import com.craft.craft.model.user.RoleName;
import com.craft.craft.security.jwt.JwtConfigurer;
import com.craft.craft.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                        .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        //swagger-----------------------------------------------------------------------------------------
                        .antMatchers(
                        "/v2/api-docs/**","/swagger-ui.html","/swagger-ui/**", "/v2/api-docs",
                        "/configuration/ui", "/swagger-resources/**", "/configuration/security",
                        "/swagger-ui.html", "/webjars/**", "/v3/api-docs/swagger-config", "/v3/api-docs/**"
                        )
                        .permitAll()
                        //auth+profile-------------------------------------------------------------------------------------
                        .antMatchers(
                                "/api/v1/profile/**",
                                "/api/v1/auth/**")
                        .permitAll()
                        //info-card---------------------------------------------------------------------------------------
                        .antMatchers(HttpMethod.GET,   "/api/v1/craft-info-card/**").permitAll()
                        //news--------------------------------------------------------------------------------------------
                        .antMatchers(HttpMethod.GET,   "/api/v1/news/**").permitAll()
                        .antMatchers("/api/v1/news/**").hasAuthority(RoleName.ADMIN.name())
                        //price-------------------------------------------------------------------------------------------
                        .antMatchers(HttpMethod.GET,   "/api/v1/price/**").permitAll()
                        .antMatchers("/api/v1/price/**").hasAuthority(RoleName.ADMIN.name())
                        //competition-------------------------------------------------------------------------------------
                        .antMatchers(
                                "/api/v1/competition/get-all",
                                "/api/v1/competition/{id}"

                        ).permitAll()
                        .antMatchers(
                                "/api/v1/competition/{competitionId}/create-and-invite",
                                "/api/v1/competition/{competitionId}/create-pair",
                                "/api/v1/competition/pair/{competitionPairId}/accept-join-request",
                                "/api/v1/competition/pair/{competitionPairId}/accept-invite-request",
                                "/api/v1/competition/pair/{competitionPairId}/request-to-join",
                                "/api/v1/competition/pair/{competitionPairId}/request-to-invite/{username}",
                                "/api/v1/competition/delete-pair/{pairId}",
                                "/api/v1/competition/pair/{competitionPairId}/reject-invite-request",
                                "/api/v1/competition/pair/{competitionPairId}/reject-join-request"
                        ).authenticated()
                        .antMatchers("/api/v1/competition/**").hasAuthority(RoleName.ADMIN.name())
                        //trains------------------------------------------------------------------------------------------
                        .antMatchers(
                                "/api/v1/train/get-calendar-by-sport-complex",
                                "/api/v1/train/{id}"
                        ).permitAll()
                        .antMatchers(
                                "/api/v1/train/{trainId}/add-user",
                                "/api/v1/train/{trainId}/remove-user"
                        ).authenticated()
                        .antMatchers("/api/v1/train/**").hasAuthority(RoleName.ADMIN.name())
                        //trains------------------------------------------------------------------------------------------
                        .antMatchers(HttpMethod.GET,"/api/v1/trainer/**").permitAll()
                        .antMatchers(HttpMethod.OPTIONS,"/api/v1/trainer/**").permitAll()
                        .antMatchers("/api/v1/trainer/**").hasAuthority(RoleName.ADMIN.name())
                        //------------------------------------------------------------------------------------------------
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