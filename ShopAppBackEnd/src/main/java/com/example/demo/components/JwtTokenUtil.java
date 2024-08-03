package com.example.demo.components;

import com.example.demo.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.InvalidParameterException;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtil {

    @Value("${jwt.expiredToken}")
    private int expiredToken; //lưu vào biến môi trường

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Deprecated
    public String generateToken(User user){
        //thuộc tính => claims
        Map<String, Object> claims = new HashMap<>();
        //this.generateSecretKey();
        claims.put("phoneNumber", user.getPhoneNumber());
        claims.put("userId", user.getId());
        try {
            return Jwts
                    .builder()
                    .setClaims(claims)
                    .setSubject(user.getPhoneNumber())
                    .setExpiration(new Date(System.currentTimeMillis() + expiredToken * 1000L))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
        }catch (Exception e){
            throw new InvalidParameterException("Can't create jwt" + e.getMessage());
        }
    }

    //mã hóa chuỗi secretKey
    private Key getSignInKey(){
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(bytes);
    }

    //Trích xuất tất cả claims trong token
    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(getSignInKey()) //Thêm phương thức secretKey để trích xuất ra claims
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

//    private String generateSecretKey(){
//        SecureRandom random = new SecureRandom();
//        byte[] keyBytes = new byte[32];
//        random.nextBytes(keyBytes);
//        String secretKey = Encoders.BASE64.encode(keyBytes);
//        return secretKey;
//    }

    //Trích xuất một claim trong tất cả các claims vaf lấy 1 trong số đó
    public  <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = this.extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    //Kiểm tra thời hạn token
    public boolean isTokenExpired(String token){
        //Lấy ra ngày hết hạn
        Date expirationDate = this.extractClaim(token, Claims:: getExpiration);
        //So sánh với ngày tạo
        return expirationDate.before(new Date());
    }

    public String extractPhoneNumber(String token){
        return this.extractClaim(token, Claims::getSubject);
    }

    public boolean vailidateToken(String token, UserDetails userDetails){
        String phoneNumber = extractPhoneNumber(token);
        return (phoneNumber.equals(userDetails.getUsername()) || !isTokenExpired(token));
    }
}
