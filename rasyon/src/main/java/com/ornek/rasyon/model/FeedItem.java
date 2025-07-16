package com.ornek.rasyon.model;

import jakarta.persistence.*;

@Entity
@Table(name = "feed_item")
@SequenceGenerator(
        name = "feed_item_seq",
        sequenceName = "feed_item_id_seq",
        allocationSize = 1
)
public class FeedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feed_item_seq")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // ——— Getters & Setters ———

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Yem maddesinin adı.
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
