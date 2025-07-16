
package com.ornek.rasyon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public Map<String, String> health() {
        try (Connection conn = dataSource.getConnection()) {
            String url = conn.getMetaData().getURL();
            return Map.of("status", "UP", "dbUrl", url);
        } catch (Exception e) {
            return Map.of("status", "DOWN", "error", e.getMessage());
        }
    }
}
