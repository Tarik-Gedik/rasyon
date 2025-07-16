package com.ornek.rasyon.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private double weight;
    private boolean pregnant;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getter & setter’lar…

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
    public boolean isPregnant() { return pregnant; }
    public void setPregnant(boolean pregnant) { this.pregnant = pregnant; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
