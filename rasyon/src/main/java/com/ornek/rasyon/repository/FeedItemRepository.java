package com.ornek.rasyon.repository;

import com.ornek.rasyon.model.FeedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedItemRepository extends JpaRepository<FeedItem, Long> {
}
