package com.ornek.rasyon.repository;

import com.ornek.rasyon.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    // earTag yöntemi artık yok; id üzerinden CRUD çalışacak
}
