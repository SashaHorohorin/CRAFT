package com.craft.craft.security.jwt;

import com.craft.craft.model.user.Role;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${jwt.token.access.secret}")
    private String secretAccess;
    @Value("${jwt.token.refresh.secret}")
    private String secretRefresh;
    @Value("${jwt.token.access.expired}")
    private Long validInMillisecondsAccess;
    @Value("${jwt.token.refresh.expired}")
    private Long validInMillisecondsRefresh;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostConstruct
    protected void init(){
        secretAccess = Base64.getEncoder().encodeToString(secretAccess.getBytes());
        secretRefresh = Base64.getEncoder().encodeToString(secretRefresh.getBytes());
        System.out.println(secretAccess);
    }

    public String createAccessToken(String username, Collection<Role> roles){
        log.info("In createAccessToken. Create for user with username: {}",username);
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", getRolesNames(roles));

        Date now = new Date();
        Date validity = new Date(now.getTime() + validInMillisecondsAccess);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretAccess)
                .compact();
    }
    public String createRefreshToken(String username){
        log.info("In createRefreshToken. Create for user with username: {}",username);
        Claims claims = Jwts.claims().setSubject(username);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validInMillisecondsRefresh);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretRefresh)
                .compact();
    }

    public Authentication getAuthentication(String token){
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsernameFromAccessToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails,"", userDetails.getAuthorities());

    }

    public String getUsernameFromAccessToken(String token){
        return Jwts.parser().setSigningKey(secretAccess).parseClaimsJws(token).getBody().getSubject();
    }
    public String getUsernameFromRefreshToken(String token){
        return Jwts.parser().setSigningKey(secretRefresh).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveAccessToken(HttpServletRequest req){
        String bearerToken = req.getHeader("Authorization");
        if(bearerToken != null && bearerToken.startsWith("Bearer_"))
            return bearerToken.substring(7);
        return null;
    }

    public String resolveRefreshToken(HttpServletRequest req){
        String token = req.getHeader("refresh");
        return token;
    }

    public boolean validateAccessToken(String token){
        log.info("In validateAccessToken with token: {}", token);
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretAccess).parseClaimsJws(token);
            if(claims.getBody().getExpiration().before(new Date()))
                return false;
            return true;
        }catch (JwtException | IllegalArgumentException e){
           // System.out.println("error");
            throw new JwtAuthenticationException("JWT access token is expired or invalid");
        }
    }
    public boolean validateRefreshToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretRefresh).parseClaimsJws(token);
            if(claims.getBody().getExpiration().before(new Date()))
                return false;
            return true;
        }catch (JwtException | IllegalArgumentException e){
            throw new JwtAuthenticationException("JWT refresh token is expired or invalid");
        }
    }

    public List<String> getRolesNames(Collection<Role> userRoles){
        List<String> res = new ArrayList<>();
        userRoles.forEach(role -> res.add(role.getName().name()));
        return res;
    }
}

