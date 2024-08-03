package com.example.demo.configuration;

import com.example.demo.components.JwtTokenFilter;
import com.example.demo.models.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                String.format("%s/users/register", apiPrefix),
                                String.format("%s/users/login", apiPrefix),
                                String.format("%s/users/details", apiPrefix),
                                String.format("%s/users/details/*", apiPrefix)
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, String.format("%s/roles**", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.GET, String.format("%s/categories**", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.POST, String.format("%s/categories/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.PUT, String.format("%s/categories/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.DELETE, String.format("%s/categories/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.GET, String.format("%s/products**", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.GET, String.format("%s/products/**", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.GET, String.format("%s/products/images/*", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.POST, String.format("%s/products/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.PUT, String.format("%s/products/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.DELETE, String.format("%s/products/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.POST, String.format("%s/orders/**", apiPrefix)).hasRole(Role.USER)
                        .requestMatchers(HttpMethod.GET, String.format("%s/orders/**", apiPrefix)).permitAll()
                        .requestMatchers(HttpMethod.GET, String.format("%s/orders/get-orders-by-keyword", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.PUT, String.format("%s/orders/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.DELETE, String.format("%s/orders/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.POST, String.format("%s/order_details/**", apiPrefix)).hasRole(Role.USER)
                        .requestMatchers(HttpMethod.GET, String.format("%s/order_details/**", apiPrefix)).hasAnyRole(Role.USER, Role.ADMIN)
                        .requestMatchers(HttpMethod.PUT, String.format("%s/order_details/**", apiPrefix)).hasRole(Role.ADMIN)
                        .requestMatchers(HttpMethod.DELETE, String.format("%s/order_details/**", apiPrefix)).hasRole(Role.ADMIN)
                        .anyRequest().authenticated()
                );

        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowedOrigins(List.of("*"));
                corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                corsConfiguration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
                corsConfiguration.setExposedHeaders(List.of("x-auth-token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", corsConfiguration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });

        return http.build();
    }
}
