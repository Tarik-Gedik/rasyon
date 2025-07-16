package com.ornek.rasyon.controller;

import com.ornek.rasyon.model.Animal;
import com.ornek.rasyon.repository.AnimalRepository;
import com.ornek.rasyon.service.FeedingPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepo;

    @Autowired
    private FeedingPlan feedingPlan;

    /** Yeni hayvan ekleme */
    @PostMapping
    public Animal addAnimal(@RequestBody Animal a) {
        return animalRepo.save(a);
    }

    /** Tüm hayvanları listele */
    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepo.findAll();
    }

    /** Rasyon hesaplama */
    @PostMapping("/calculate")
    public Map<String, BigDecimal> calculateFeeding(@RequestBody Animal animal) {
        return feedingPlan.calculateRation(animal);
    }

    /** ID ile silme ve sebepleri loglama */
    @DeleteMapping("/{id}")
    public void deleteAnimal(
            @PathVariable Long id,
            @RequestParam String reason
    ) {
        // İstersen silme kaydını burada logla veya ayrı tabloya yaz
        System.out.println("Silme sebebi: " + reason + " for ID=" + id);
        animalRepo.deleteById(id);
    }
}
