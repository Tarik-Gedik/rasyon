package com.ornek.rasyon.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "ration_variant")
@SequenceGenerator(name="ration_variant_seq", sequenceName="ration_variant_id_seq", allocationSize=1)
public class RationVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ration_variant_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "variant_no", nullable = false)
    private Integer variantNo;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RationItem> items;

    // ——— Getters & Setters ———

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getVariantNo() {
        return variantNo;
    }

    public void setVariantNo(Integer variantNo) {
        this.variantNo = variantNo;
    }

    public List<RationItem> getItems() {
        return items;
    }

    public void setItems(List<RationItem> items) {
        this.items = items;
    }
}
