package com.ornek.rasyon.repository;

import com.ornek.rasyon.model.RationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RationItemRepository extends JpaRepository<RationItem, Long> {
    List<RationItem> findByVariantId(Long variantId);
}
