package com.ornek.rasyon.repository;

import com.ornek.rasyon.model.FeedingGuideline;
import com.ornek.rasyon.model.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FeedingGuidelineRepository extends JpaRepository<FeedingGuideline, Long> {

    @Query("""
      SELECT f 
      FROM FeedingGuideline f
      WHERE :weight BETWEEN f.minWeightKg AND f.maxWeightKg
        AND :age    BETWEEN f.minAgeMonths AND f.maxAgeMonths
        AND (f.gender = :gender OR f.gender = com.ornek.rasyon.model.Gender.ANY)
        AND (f.pregnantRequired = false OR f.pregnantRequired = :isPregnant)
    """)
    List<FeedingGuideline> findFor(
            @Param("weight")     BigDecimal weight,
            @Param("age")        Integer ageMonths,
            @Param("gender")     Gender gender,
            @Param("isPregnant") boolean isPregnant
    );
}
