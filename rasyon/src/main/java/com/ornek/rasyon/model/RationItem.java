package com.ornek.rasyon.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ration_item")
@SequenceGenerator(name="ration_item_seq", sequenceName="ration_item_id_seq", allocationSize=1)
public class RationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ration_item_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private RationVariant variant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_item_id", nullable = false)
    private FeedItem feedItem;

    @Column(name = "amount_kg_per_day", nullable = false)
    private BigDecimal amountKgPerDay;

    // ——— Getters & Setters ———

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RationVariant getVariant() {
        return variant;
    }

    public void setVariant(RationVariant variant) {
        this.variant = variant;
    }

    public FeedItem getFeedItem() {
        return feedItem;
    }

    public void setFeedItem(FeedItem feedItem) {
        this.feedItem = feedItem;
    }

    public BigDecimal getAmountKgPerDay() {
        return amountKgPerDay;
    }

    public void setAmountKgPerDay(BigDecimal amountKgPerDay) {
        this.amountKgPerDay = amountKgPerDay;
    }
}
