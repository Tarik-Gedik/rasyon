package com.ornek.rasyon.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // Bu sınıf bir yapılandırma sınıfıdır
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Tüm API uç noktalarına izin veriyoruz
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // React frontend'inizin adresi
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);  // Kimlik doğrulama ve cookie kullanımı için
    }
}
