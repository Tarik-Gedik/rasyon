package com.ornek.rasyon.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "feeding_guideline")
@SequenceGenerator(
        name = "feeding_guideline_seq",
        sequenceName = "feeding_guideline_id_seq",
        allocationSize = 1
)
public class FeedingGuideline {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feeding_guideline_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_item_id", nullable = false)
    private FeedItem feedItem;

    @Column(name = "min_weight_kg",     nullable = false)
    private BigDecimal minWeightKg;

    @Column(name = "max_weight_kg",     nullable = false)
    private BigDecimal maxWeightKg;

    @Column(name = "min_age_months",    nullable = false)
    private Integer minAgeMonths;

    @Column(name = "max_age_months",    nullable = false)
    private Integer maxAgeMonths;

    @Column(name = "amount_kg_per_day", nullable = false)
    private BigDecimal amountKgPerDay;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(name = "pregnant_required", nullable = false)
    private boolean pregnantRequired;

    // ——— Getter & Setter Metotları ———

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FeedItem getFeedItem() {
        return feedItem;
    }

    public void setFeedItem(FeedItem feedItem) {
        this.feedItem = feedItem;
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

    public BigDecimal getAmountKgPerDay() {
        return amountKgPerDay;
    }

    public void setAmountKgPerDay(BigDecimal amountKgPerDay) {
        this.amountKgPerDay = amountKgPerDay;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public boolean isPregnantRequired() {
        return pregnantRequired;
    }

    public void setPregnantRequired(boolean pregnantRequired) {
        this.pregnantRequired = pregnantRequired;
    }
}
