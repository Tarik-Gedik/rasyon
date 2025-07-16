package com.ornek.rasyon.repository;

import com.ornek.rasyon.model.RationVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RationVariantRepository extends JpaRepository<RationVariant, Long> {
    List<RationVariant> findByCategoryId(Long categoryId);
}
