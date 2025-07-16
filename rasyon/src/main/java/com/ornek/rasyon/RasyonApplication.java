package com.ornek.rasyon;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class RasyonApplication {
    public static void main(String[] args) {
        SpringApplication.run(RasyonApplication.class, args);
    }

    @Bean
    public CommandLineRunner testDataSource(DataSource ds) {
        return args -> {
            try (Connection conn = ds.getConnection()) {
                System.out.println("DB bağlantısı OK: " + conn.getMetaData().getURL());
            } catch (Exception e) {
                System.err.println("DB bağlantı hatası: " + e.getMessage());
            }
        };
    }
}
