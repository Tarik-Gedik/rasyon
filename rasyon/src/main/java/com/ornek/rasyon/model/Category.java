package com.ornek.rasyon.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "category")
@SequenceGenerator(name="category_seq", sequenceName="category_id_seq", allocationSize=1)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    private Long id;

    @Column(name="min_age_months", nullable=false)
    private Integer minAgeMonths;

    @Column(name="max_age_months", nullable=false)
    private Integer maxAgeMonths;

    @Column(name="min_weight_kg", nullable=false)
    private BigDecimal minWeightKg;

    @Column(name="max_weight_kg", nullable=false)
    private BigDecimal maxWeightKg;

    // ——— Getters & Setters ———

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinAgeMonths() {
        return minAgeMonths;
    }

    public void setMinAgeMonths(Integer minAgeMonths) {
        this.minAgeMonths = minAgeMonths;
    }

    public Integer getMaxAgeMonths() {
        return maxAgeMonths;
    }

    public void setMaxAgeMonths(Integer maxAgeMonths) {
        this.maxAgeMonths = maxAgeMonths;
    }

    public BigDecimal getMinWeightKg() {
        return minWeightKg;
    }

    public void setMinWeightKg(BigDecimal minWeightKg) {
        this.minWeightKg = minWeightKg;
    }

    public BigDecimal getMaxWeightKg() {
        return maxWeightKg;
    }

    public void setMaxWeightKg(BigDecimal maxWeightKg) {
        this.maxWeightKg = maxWeightKg;
    }
}
